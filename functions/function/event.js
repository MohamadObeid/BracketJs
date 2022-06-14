const { toApproval } = require("./toApproval")
const { toParam } = require("./toParam")
const { toValue } = require("./toValue")
const { clone } = require("./clone")
const { toArray } = require("./toArray")
const { toCode } = require("./toCode")

const events = [
  "click",
  "mouseenter",
  "mouseleave",
  "mousedown",
  "mouseup",
  "touchstart",
  "touchend"
]

const addEventListener = ({ _window, controls, id, req, res }) => {
  
  const { execute } = require("./execute")

  var views = _window ? _window.views : window.views
  var global = _window ? _window.global : window.global
  var view = views[id]
  var mainID = id

  // 'string'
  var events = controls.event
  if (events.split("'").length > 2) events = toCode({ _window, string: events, start: "'", end: "'" })
  events = toCode({ _window, id, string: events })
  
  events = events.split("?")
  var _idList = toValue({ id, value: events[3] || id })

  // droplist
  var droplist = (events[1] || "").split(";").find(param => param === "droplist()")
  if (droplist && view.droplist) {
    
    view.droplist.controls = view.droplist.controls || []
    return view.droplist.controls.push({
      event: events.join("?").replace("droplist()", ""),
      actions: controls.actions
    })
  }

  // actionlist
  var actionlist = (events[1] || "").split(";").find(param => param === "actionlist()")
  if (actionlist && view.actionlist) {
    
    view.actionlist.controls = view.actionlist.controls || []
    return view.actionlist.controls.push({
      event: events.join("?").replace("actionlist()", ""),
      actions: controls.actions
    })
  }

  // popup
  var popup = (events[1] || "").split(";").find(param => param === "popup()")
  if (popup && view.popup) {
    
    view.popup = typeof view.popup === "object" ? view.popup : {}
    view.popup.controls = view.popup.controls || []

    return view.popup.controls.push({
      event: events.join("?").replace("popup()", ""),
      actions: controls.actions
    })
  }

  events[0].split(";").map(event => {

    // case event is coded
    if (event.slice(0, 7) === "coded()") {
      event = global.codes[event]
      if (event.includes("?")) {
        var viewEventIdList = event.split("?")[3]
        var viewEventConditions = event.split("?")[2]
        var viewEventParams = event.split("?")[1]
        event = event.split("?")[0]
      }
    }

    // id
    if (viewEventIdList) mainID = toValue({ _window, req, res, id, value: viewEventIdList })
    
    var timer = 0, idList
    var once = events[1] && events[1].includes('once')

    // action:id
    var eventid = event.split(":")[1]
    if (eventid) idList = toValue({ _window, req, res, id, value: eventid })
    else idList = clone(_idList)

    idList = toArray(idList).map(id => {
      if (typeof id === "object" && id.id) return id.id
      else return id
    })

    // timer
    timer = event.split(":")[2] || 0

    // event
    event = event.split(":")[0]

    if (!event || !view) return
    clearTimeout(view[`${event}-timer`])

    // add event listener
    idList.map(id => {

      var _view = views[id]
      if (!_view && id !== "window") return
      
      var myFn = (e) => {

        setTimeout(async () => {

          // approval
          if (viewEventConditions) {
            var approved = toApproval({ _window, req, res, string: viewEventConditions, e, id: mainID })
            if (!approved) return
          }
          
          // approval
          var approved = toApproval({ _window, req, res, string: events[2], e, id: mainID })
          if (!approved) return

          // once
          if (once) e.target.removeEventListener(event, myFn)
          
          // params
          await toParam({ _window, req, res, string: events[1], e, id: mainID, mount: true })

          // break
          if (view.break) return delete view.break
          
          // approval
          if (viewEventParams) await toParam({ _window, req, res, string: viewEventParams, e, id: mainID, mount: true })
          
          // execute
          if (controls.actions || controls.action) await execute({ _window, req, res, controls, e, id: mainID })
        }, timer)
      }
      
      // onload event
      if (event === "loaded" || event === "loading" || event === "beforeLoading") return myFn({ target: _view.element })
      else if (id === "window") return window.addEventListener(event, myFn)

      // body event
      if (id === "body") {
        
        global[`body-${event}-events`] = global[`body-${event}-events`] || {}
        global[`body-${event}-events`][mainID] = global[`body-${event}-events`][mainID] || []
        var index = global[`body-${event}-events`][mainID].length
        global[`body-${event}-events`][mainID].push({ id: mainID, viewEventConditions, viewEventParams, events, once, controls, index, event })
        return
      }

      var myFn = (e) => {
        
        view[`${event}-timer`] = setTimeout(async () => {
          
          // body
          if (eventid === "droplist" || eventid === "actionlist") id = mainID
          if (eventid === "droplist" && id !== global["droplist-positioner"]) return
          if (eventid === "actionlist" && id !== global["actionlist-caller"]) return
          
          var __view = views[id]

          if (once) e.target.removeEventListener(event, myFn)

          // view doesnot exist
          if (!__view) {
            if (e.target) e.target.removeEventListener(event, myFn)
            return 
          }
        
          // approval
          if (viewEventConditions) {
            var approved = toApproval({ _window, req, res, string: viewEventConditions, e, id: mainID })
            if (!approved) return
          }
          
          // approval
          var approved = toApproval({ string: events[2], e, id: mainID })
          if (!approved) return

          // params
          await toParam({ string: events[1], e, id: mainID, mount: true })

          // break
          if (view.break) return delete view.break
        
          // approval
          if (viewEventParams) await toParam({ _window, req, res, string: viewEventParams, e, id: mainID, mount: true })
          
          if (controls.actions || controls.action) await execute({ controls, e, id: mainID })
          
        }, timer)
      }
      
      // elements
      _view.element.addEventListener(event, myFn)
    })
  })
}

const defaultEventHandler = ({ id }) => {

  var view = window.views[id]
  var global = window.global
/*
  view.touchstart = false
  view.mouseenter = false
  view.mousedown = false
*/
  if (view.link) view.element.addEventListener("click", (e) => e.preventDefault())

  // input
  if (view.type === "Input") {

    // focus
    var setEventType = (e) => {

      if (!window.views[id]) return e.target.removeEventListener("focus", setEventType)
      view.focus = true
    }

    view.element.addEventListener("focus", setEventType)

    // blur
    var setEventType = (e) => {

      if (!window.views[id]) return e.target.removeEventListener("blur", setEventType)
      view.focus = false
    }

    view.element.addEventListener("blur", setEventType)
  }
/*
  events.map((event) => {
    
    var setEventType = (e) => {

      if (!window.views[id]) return e.target.removeEventListener(event, setEventType)

      if (event === "mouseenter") view.mouseenter = true
      else if (event === "mouseleave") view.mouseenter = false
      else if (event === "mousedown") {

        view.mousedown = true
        window.views["tooltip"].element.style.opacity = "0"
        clearTimeout(global["tooltip-timer"])
        delete global["tooltip-timer"]

      } 
      else if (event === "mouseup") view.mousedown = false
      else if (event === "touchstart") view.touchstart = true
      else if (event === "touchend") view.touchstart = false
    }

    view.element.addEventListener(event, setEventType)
  })
*/
}

module.exports = { addEventListener, defaultEventHandler }
