const { toApproval } = require("./toApproval")
const { toArray } = require("./toArray")
const { toParam } = require("./toParam")
const { toValue } = require("./toValue")
const _method = require("./function")
const { toCode } = require("./toCode")

const execute = ({ _window, controls, actions, e, id, params }) => {

  var local = (_window ? _window.value[id] : window.value[id]) || {}
  var _params = params, localId = id

  if (controls) actions = controls.actions
  if (local) local.break = false

  // execute actions
  toArray(actions).map(_action => {
    _action = toCode({ _window, string: _action, e })
    
    var awaiter = []
    
    // stop after actions
    if (local && local.break) return

    var approved = true
    var actions = _action.split("?")
    var params = actions[1]
    var conditions = actions[2]
    var idList = actions[3] || localId

    // id list
    idList = toValue({ _window, id, value: idList, e })
    
    actions = actions[0].split(";")

    // approval
    if (conditions) approved = toApproval({ _window, string: conditions, params, id: localId, e })
    if (!approved) return

    // params
    params = toParam({ _window, string: params, e, id: localId })
    if (_params) params = {..._params, ...params}

    // break
    local.break = params.break
    delete params.break

    // action does not exist
    actions.map(action => {

      // action === name:id:timer<<condition
      var caseCondition = action.split('<<')[1]
      var name = action.split('<<')[0]
      var actionid = name.split(":")[1]
      var timer = name.split(":")[2]
      if (timer) timer = parseInt(timer)
      name = name.split(':')[0]

      // action:id
      if (actionid) actionid = toValue({ _window, value: actionid, params, id: localId, e })
      
      const myFn = () => {
        var approved = true

        // asyncer & awaiter
        var keys = name.split("."), isAwaiter, isAsyncer
        if (keys.length > 1) keys.map(k => {
  
          if (k === "async()") isAsyncer = true
          else if (k === "await()") {
            isAwaiter = true
            awaiter.push(action.split("await().")[1])
          }
        })

        if (isAwaiter || isAsyncer) name = name.split(".")[1]
        if (isAwaiter) return

        // case condition approval
        if (caseCondition) approved = toApproval({ _window, string: caseCondition, params, id: localId, e })
        if (!approved) return
        
        if (_method[name]) toArray(actionid ? actionid : idList).map(async id => {
          
          if (typeof id !== "string") return

          // id = value.path
          if (id.indexOf(".") > -1) id = toValue({ _window, value: id, e, id: localId })
          
          // component does not exist
          if (!id || !window.value[id]) return

          if (isAsyncer) {
            params.awaiter = awaiter
            params.asyncer = isAsyncer
          }

          await _method[name]({ _window, ...params, e, id })
        })
      }

      if (timer !== undefined) {

        if (local) {

          var _name = name.split('.')[1] || name.split('.')[0]
          if (params["setInterval()"]) local[`${_name}-interval`] = setInterval(myFn, timer)
          else local[`${_name}-timer`] = setTimeout(myFn, timer)

        } else {

          if (params["setInterval()"]) setInterval(myFn, timer)
          else setTimeout(myFn, timer)
        }

      } else myFn()
    })
  })
}

module.exports = { execute }