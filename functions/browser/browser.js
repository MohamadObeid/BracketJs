const { starter } = require("../function/starter")
const { setElement } = require("../function/setElement")

window.children = JSON.parse(document.getElementById("children").textContent)
window.global = JSON.parse(document.getElementById("global").textContent)

var value = window.children
var global = window.global

value.document = document
value.document.element = document
value.body.element = document.body
value.window = { element: window }

// lunch arabic text
var _ar = document.createElement("P")
_ar.innerHTML = "مرحبا"
_ar.classList.add("ar")
_ar.style.position = "absolute"
_ar.style.top = "-1000px"
value.body.element.appendChild(_ar)

history.pushState(null, global.data.page[global.currentPage].title, global.path)

// clicked element
document.addEventListener('click', e => {

    global["clickedElement()"] = window.children[(e || window.event).target.id]
    global.clickedElement = (e || window.event).target
    
}, false)

// default global mode
global.mode = global["default-mode"] = global["default-mode"] || "Light"
global.idList.map(id => setElement({ id }))
global.idList.map(id => starter({ id }))

var icons = global.idList.filter(id => value[id].type === "Icon").map(id => value[id])
window.onload = () => {
    icons.map(map => {
        map.element.style.opacity = map.style.opacity !== undefined ? map.style.opacity : "1"
        map.element.style.transition = map.style.transition !== undefined ? map.style.transition : "none"
    })
}

Object.entries(window.children).map(([id, value]) => {
    if (value.status === "Loading") delete window.children[id]
})