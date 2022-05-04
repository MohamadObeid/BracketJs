const axios = require('axios')
const { toString } = require('./toString')
const { toAwait } = require('./toAwait')
const { clone } = require('./clone')

module.exports = {
    search: async ({ id, e, ...params }) => {
        
        var search = params.search || {}
        var local = window.children[id]
        var collection = search.collection || search.path || ""
        var _params = encodeURI(toString({ search }))
        search.headers = search.headers || {}
        search.headers.project = search.headers.project || global.data.project.id
        
        var { data } = await axios.get(`/api/${collection}?${_params}`, {
            headers: {
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers",
                ...search.headers
            }
        })
        local.search = clone(data)
        console.log(data)
        
        // await params
        toAwait({ id, e, params })
    }
}