module.exports = {
  toStyle: ({ _window, id }) => {

    var view = _window ? _window.views[id] : window.views[id]
    var style = ""

    if (view.style) {
      Object.entries(view.style).map(([k, v]) => {
        if (k === "after" || k.includes(">>")) return;
        else if (k === "userSelect") k = "user-select";
        else if (k === "inlineSize") k = "inline-size";
        else if (k === "clipPath") k = "clip-path";
        else if (k === "flexWrap") k = "flex-wrap";
        else if (k === "wordWrap") k = "word-wrap";
        else if (k === "wordBreak") k = "word-break";
        else if (k === "verticalAlign") k = "vertical-align";
        else if (k === "borderBottom") k = "border-bottom";
        else if (k === "borderLeft") k = "border-left";
        else if (k === "borderRight") k = "border-right";
        else if (k === "borderTop") k = "border-top";
        else if (k === "paddingBottom") k = "padding-bottom";
        else if (k === "paddingLeft") k = "padding-left";
        else if (k === "paddingRight") k = "padding-right";
        else if (k === "paddingTop") k = "padding-top";
        else if (k === "marginBottom") k = "margin-bottom";
        else if (k === "marginLeft") k = "margin-left";
        else if (k === "marginRight") k = "margin-right";
        else if (k === "marginTop") k = "margin-top";
        else if (k === "fontSize") k = "font-size";
        else if (k === "fontStyle") k = "font-style";
        else if (k === "fontWeight") k = "font-weight";
        else if (k === "textDecoration") k = "text-decoration";
        else if (k === "lineHeight") k = "line-height";
        else if (k === "letterSpacing") k = "letter-spacing";
        else if (k === "textOverflow") k = "text-overflow";
        else if (k === "whiteSpace") k = "white-space";
        else if (k === "backgroundColor") k = "background-color";
        else if (k === "zIndex") k = "z-index";
        else if (k === "boxShadow") k = "box-shadow";
        else if (k === "borderRadius") k = "border-radius";
        else if (k === "zIndex") k = "z-index";
        else if (k === "alignItems") k = "align-items";
        else if (k === "alignSelf") k = "align-self";
        else if (k === "justifyContent") k = "justify-content";
        else if (k === "justifySelf") k = "justify-self";
        else if (k === "userSelect") k = "user-select";
        else if (k === "textAlign") k = "text-align";
        else if (k === "pointerEvents") k = "pointer-events";
        else if (k === "flexDirection") k = "flex-direction";
        else if (k === "flexGrow") k = "flex-grow";
        else if (k === "flexShrink") k = "flex-shrink";
        else if (k === "maxWidth") k = "max-width";
        else if (k === "minWidth") k = "min-width";
        else if (k === "maxHeight") k = "max-height";
        else if (k === "minHeight") k = "min-height";
        else if (k === "overflowX") k = "overflow-x";
        else if (k === "overflowY") k = "overflow-y";
        else if (k === "rowGap") k = "row-gap";
        else if (k === "columnGap") k = "column-gap";
        else if (k === "pageBreakInside") k = "page-break-inside";
        else if (k === "pageBreakBefore") k = "page-break-before";
        else if (k === "pageBreakAfter") k = "page-break-after";
        else if (k === "gridTemplateColumns") k = "grid-template-columns";
        else if (k === "gridAutoColumns") k = "grid-auto-columns";
        else if (k === "gridTemplateRows") k = "grid-template-rows";
        else if (k === "gridAutoRows") k = "grid-auto-columns";
        style += `${k}:${v}; `
      })
    }

    return style
  }
}
