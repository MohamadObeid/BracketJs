navigator.serviceWorker.register("/resources/dummy-sw.js")

const { starter } = require("../function/starter")
const { setElement } = require("../function/setElement")
const { getCookie } = require("../function/cookie")
const { toParam } = require("../function/toParam")
const { toApproval } = require("../function/toApproval")
const { execute } = require("../function/execute")
const { toCode } = require("../function/toCode")
const { clone } = require("../function/clone")

window.views = JSON.parse(document.getElementById("views").textContent)
window.global = JSON.parse(document.getElementById("global").textContent)

// navigator.serviceWorker.register('sw.js')
//
var views = window.views
var global = window.global

// access key
global["access-key"] = getCookie({ name: "_key" })
global["body-click-events"] = {}
global["body-mousemove-events"] = {}
global["body-mousedown-events"] = {}
global["body-mouseup-events"] = {}
global["before-print-events"] = {}
global["after-print-events"] = {}

global["click-events"] = []
global["key-events"] = []

views.document = document
views.document.element = document
views.body.element = document.body

// lunch arabic text
var _ar = document.createElement("P")
_ar.innerHTML = "مرحبا"
_ar.classList.add("ar")
_ar.style.position = "absolute"
_ar.style.top = "-1000px"
views.body.element.appendChild(_ar)

history.pushState(null, global.data.page[global.currentPage].title, global.path)
window.onfocus = () => {
    
    global["click-events"] = []
    global["key-events"] = []
    views.root.element.click()
    document.activeElement.blur()
}

// body clicked
var bodyEventListener = async ({ id, viewEventConditions, viewEventParams, events, once, controls, index, event }, e) => {
    
    if (!views[id]) return
    e.target = views[id].element
    
    // approval
    if (viewEventConditions) {
        var approved = toApproval({ string: viewEventConditions, id, e })
        if (!approved) return
    }

    // approval
    if (events[2]) {
        var approved = toApproval({ string: events[2], id, e })
        if (!approved) return
    }

    // once
    if (once) window.global[`body-${event}-events`][id].splice(index, 1)
    
    // params
    await toParam({ string: events[1], id, mount: true, e })
    
    // approval
    if (viewEventParams) await toParam({ string: viewEventParams, id, mount: true, e })
    
    // execute
    if (controls.actions || controls.action) await execute({ controls, id, e })
}

// clicked element
document.body.addEventListener('click', e => {
  
    var global = window.global
    global["key-events"] = []

    var global = window.global
    global["clickedElement()"] = global["clicked"] = global["clicked()"] = views[((e || window.event).target||e.currentTarget).id]
    global.clickedElement = (e || window.event).target

    // droplist
    if (global.clickedElement.id === "droplist") delete global["droplist-item-clicked"]
    else if (views.droplist.element.contains(global.clickedElement)) {
        global["droplist-item-clicked"] = global["droplist-item"] = global.clickedElement
        global["droplist-item-txt"] = global["droplist-txt"] = global.clickedElement.innerHTML
    }

    // actionlist
    else if (global.clickedElement.id === "actionlist") delete global["actionlist-item-clicked"]
    else if (views.droplist.element.contains(global.clickedElement)) {
        global["actionlist-item-clicked"] = global["actionlist-item"] = global.clickedElement
        global["actionlist-item-txt"] = global["actionlist-txt"] = global.clickedElement.innerHTML
    }
    
    // body event listeners
    Object.values(global["body-click-events"]).flat().map(o => bodyEventListener(o, e))

    // click events
    global["click-events"].map(o => bodyEventListener(o, e))
    global["click-events"] = []

}, false)

// mousemove
document.body.addEventListener('mousemove', (e) => {
    global.screenX = e.screenX
    global.screenY = e.screenY
    Object.values(window.global["body-mousemove-events"]).flat().map(o => bodyEventListener(o, e))
}, false)

document.addEventListener("mousedown", (e) => {
    window.global.mousedown = true
    Object.values(window.global["body-mousedown-events"]).flat().map(o => bodyEventListener(o, e))
})

document.addEventListener("mouseup", (e) => {
    window.global.mousedown = false
    Object.values(window.global["body-mouseup-events"]).flat().map(o => bodyEventListener(o, e))
})

document.addEventListener('keydown', e => {
    if (e.ctrlKey) global.ctrlKey = true
})

document.addEventListener('keyup', e => {
    if (!e.ctrlKey) global.ctrlKey = false
    
    // key events
    global["click-events"] = []
    global["key-events"].map(o => bodyEventListener(o, e))
    global["key-events"] = []
})

// default global mode
global.mode = global["default-mode"] = global["default-mode"] || "Light"
global.idList.map(id => setElement({ id }))
global.idList.map(id => starter({ id }))

// show icons
var icons = global.idList.filter(id => views[id] && views[id].type === "Icon").map(id => views[id])
window.onload = () => {
    icons.map(view => {
        if (view.element) {
            view.element.style.opacity = view.style.opacity !== undefined ? view.style.opacity : "1"
            view.element.style.transition = view.style.transition !== undefined ? view.style.transition : "none"
        }
    })
}

delete global.idList

window.onmousedown = (e) => {
    // e.preventDefault()
    
    var global = window.global
    global["clickedElement()"] = views[(e || window.event).target.id]
    global.clickedElement = (e || window.event).target
}

Object.entries(views).map(([id, views]) => {
    if (views.status === "Loading") delete views[id]
})

document.addEventListener('scroll', () => {
    
    // close droplist
    if (views.droplist.element.style.pointerEvents === "auto") {
        
        var closeDroplist = toCode({ string: "if():[!():droplist.mouseenter]:[():droplist.mouseleave()]" })
        toParam({ string: closeDroplist, id: "droplist" })
    }

    // close actionlist
    if (views.actionlist.element.style.pointerEvents === "auto") {

        var closeActionlist = toCode({ string: "if():[!():actionlist.mouseenter]:[():actionlist.mouseleave()]" })
        toParam({ string: closeActionlist, id: "actionlist" })
    }
}, true)

window.addEventListener("keydown", function(e) {
  if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
      e.preventDefault()
  }
}, false)
// unloaded views
// require("../function/loadViews").loadViews(true)
// new Promise(res => require("../function/loadViews").loadViews(res)).then(() => {})

window.addEventListener('beforeinstallprompt', function (e) {

  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  
  // Stash the event so it can be triggered later.
  window.global["installApp"] = e
  //setTimeout(() => { console.log(window.global["installApp"]); window.global["installApp"].prompt() }, 1000)
})

window.addEventListener('appinstalled', () => {
  // Log install to analytics
  console.log('INSTALL: Success')
})