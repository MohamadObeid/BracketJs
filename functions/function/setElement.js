const { controls } = require("./controls")
// const { starter } = require("./starter")
const { toArray } = require("./toArray")

const setElement = ({ id }) => {

    var toReturn
    var local = window.value[id]
    var global = window.global
    if (!local) return delete window.value[id]
    
    // before loading event
    var beforeLoadingControls = local.controls && toArray(local.controls)
        .filter(control => control.event && control.event.split("?")[0].includes("beforeLoading"))
    if (beforeLoadingControls) {

        var currentPage = global.currentPage
        controls({ controls: beforeLoadingControls, id })
        local.controls = toArray(local.controls).filter(controls => controls.event ? !controls.event.includes("beforeLoading") : true)

        // page routed
        if (currentPage !== global.currentPage) return true
    }

    // status
    local.status = "Mounting Element"
    
    local.element = document.getElementById(id)
    if (!local.element) return delete window.value[id]

    // run starter for children
    var children = [...local.element.children]
    
    children.map(el => {

        if (toReturn) return
        var id = el.id
        if (!id) return
        toReturn = setElement({ id })
    })

    // status
    local.status = "Element Loaded"
    return toReturn
}
    
module.exports = { setElement }