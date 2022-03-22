const { generate } = require("./generate")
const { starter } = require("./starter")
const { setElement } = require("./setElement")
const { createElement } = require("./createElement")
const { clone } = require("./clone")
const { removeChildren } = require("./update")
const { toArray } = require("./toArray")

const toggleView = ({ toggle, id }) => {

  var value = window.value
  var global = window.global
  var togglePage = toggle.page 
  var toggleId = toggle.id
    || togglePage && value.root && value.root.element.children[0] && value.root.element.children[0].id 
    || value[id] && value[id].element.children[0] && value[id].element.children[0].id
  var parentId = toggleId ? value[toggleId].parent : id
  var local = {}
  var viewId = toggle.viewId

  toggle.fadein = toggle.fadein || {}
  toggle.fadeout = toggle.fadeout || {}

  toggle.fadein.before = toggle.fadein.before || {}
  toggle.fadeout.before = toggle.fadeout.before || {}

  toggle.fadein.after = toggle.fadein.after || {}
  toggle.fadeout.after = toggle.fadeout.after || {}

  // children
  var children = []
  if (togglePage) {

    global.currentPage = togglePage.split("/")[0]
    var title = global.data.page[global.currentPage].title
    history.pushState(null, title, togglePage === "main" ? "/" : togglePage)
    document.title = title
    local = value.root
    children = global.data.page[global.currentPage]["view-id"].map(view => global.data.view[view])

  } else {

    children = toArray(global.data.view[viewId])
    local = value[parentId]
  }

  if (!children) return
  if (!local || !local.element) return

  // fadeout
  var timer = toggle.timer || toggle.fadeout.timer || 200

  if (toggleId && value[toggleId] && value[toggleId].element) {
    
    value[toggleId].element.style.transition = toggle.fadeout.after.transition || `${timer}ms ease-out`
    value[toggleId].element.style.transform = toggle.fadeout.after.transform || "translateX(-10%)"
    value[toggleId].element.style.opacity = toggle.fadeout.after.opacity || "0"

    // remove id from VALUE
    removeChildren({ id: toggleId })
    delete value[toggleId]
  }
  
  var innerHTML = children
    .map((child, index) => {

      var id = child.id || generate()
      value[id] = clone(child)
      value[id].id = id
      value[id].index = index
      value[id].parent = local.id
      value[id].style = {}
      value[id].style.transition = toggle.fadein.before.transition || null
      value[id].style.opacity = toggle.fadein.before.opacity || "0"
      value[id].style.transform = toggle.fadein.before.transform || "translateX(10%)"

      return createElement({ id })

    }).join("")

  // mount innerhtml
  setTimeout(() => {
    
    local.element.innerHTML = innerHTML

    setTimeout(() => {

      var children = [...local.element.children]
      children.map(child => {
  
        var id = child.id
        setElement({ id })
        setTimeout(() => starter({ id }), 0)
      })
      
      // fadein
      setTimeout(() => {
  
        var timer = toggle.timer || toggle.fadein.timer || 200
        children[0].style.transition = toggle.fadein.after.transition || `${timer}ms ease-out`
        children[0].style.transform = toggle.fadein.after.transform || "translateX(0)"
        children[0].style.opacity = toggle.fadein.after.opacity || "1"
  
      }, toggle.timer || 200)
      
      // focus({ id: local.id })
    }, 0)

  }, toggle.timer || 200)
}

module.exports = {toggleView}
