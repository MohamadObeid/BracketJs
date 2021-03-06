const overflow = ({ id }) => {

  var view = window.views[id]
  var width = view.element.clientWidth
  var height = view.element.clientHeight
  var text

  if (view.type === "Input" || view.type === "Textarea") {
    text = view.element.value
  } else if (
    view.type === "Text" ||
    view.type === "Label" ||
    view.type === "Header"
  ) {
    text = view.element.innerHTML
  } else if (view.type === "UploadInput") text = view.element.value

  // create a test div
  let lDiv = document.createElement("div")

  document.body.appendChild(lDiv)

  var pStyle = view.element.style
  var pText = view.data || view.input.value || ""
  var pFontSize = pStyle.fontSize

  if (pStyle != null) {
    lDiv.style = pStyle
  }

  lDiv.style.fontSize = pFontSize
  lDiv.style.position = "absolute"
  lDiv.style.left = -1000
  lDiv.style.top = -1000
  lDiv.style.padding = pStyle.padding

  lDiv.innerHTML = pText

  var lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  }

  document.body.removeChild(lDiv)
  lDiv = null

  var overflowX, overflowY
  
  if (width < lResult.width) overflowX = true
  if (height < lResult.height) overflowY = true

  return [overflowX, overflowY]
}

module.exports = {overflow}
