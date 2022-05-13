const axios = require("axios");
const { toString } = require("./toString")
const { toAwait } = require("./toAwait")

const erase = async ({ id, e, ...params }) => {

  var erase = params.erase || {}
  var local = window.children[id]
  var collection = erase.collection = erase.collection || erase.path
  var headers = erase.headers || {}
  headers.project = headers.project || global.projectId

  // erase
  headers.erase = encodeURI(toString({ erase }))

  // access key
  if (global["access-key"]) headers["access-key"] = global["access-key"]
  
  // no id
  if (!erase.id && !erase.doc && !erase.docs) return
  erase.doc = erase.doc || erase.id
  if (erase.doc === undefined) delete erase.doc

  var { data } = await axios.delete(`/database/${collection}`, {
    headers: {
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
      ...headers
    }
  })

  local.erase = data
  console.log(data)

  toAwait({ id, e, params })
}

module.exports = { erase }