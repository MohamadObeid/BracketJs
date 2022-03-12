const setElement = ({ id }) => {

    var local = window.value[id]
    if (!local) return delete window.value[id]

    // status
    local.status = "Mounting Element"
    
    local.element = document.getElementById(id)
    if (!local.element) return delete window.value[id]

    // run starter for children
    var children = [...local.element.children]
    
    children.map(el => {

        var id = el.id
        if (!id) return
        setElement({ id })
    })

    // status
    local.status = "Element Loaded"
}
    
module.exports = { setElement }