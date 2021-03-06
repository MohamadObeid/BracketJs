var functions = require("firebase-functions")
var express = require("express")
var device = require('express-device')
var cookieParser = require('cookie-parser')
var firebase = require("firebase-admin")
// require("firebase/firestore")

// var bracketDomains = ["bracketjs.com", "localhost", "bracket.localhost"]

// config
require('dotenv').config()

// firebase
firebase.initializeApp({ 
  credential: firebase.credential.cert(JSON.parse(process.env.FBSA)), 
  databaseURL: process.env.DBU,
  apiKey: process.env.AK,
  authDomain: process.env.AD,
  storageBucket: process.env.SB,
  messagingSenderId: process.env.MSI,
  projectId: process.env.PI,
  appId: process.env.AI
})

var db = firebase.firestore()
var realtimedb = firebase.database()
var storage = firebase.storage()

// realtimedb.ref("view-bracketjs").set({ type: "View" })

/* 
realtimedb.ref("view-bracketjs").once("value").then(function(snapshot) {
  console.log( snapshot.val() )
}) 
*/

var { getdb, postdb, deletedb } = require("./function/database")
var { getFile, postFile, deleteFile } = require("./function/storage")
var { createDocument } = require("./function/createDocument")
var { sendConfirmationEmail } = require("./function/sendConfirmationEmail")

var app = express()

app.use(device.capture())
app.use(express.static("browser", { redirect: false }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.json({ limit: '50mb' }))

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.set('Access-Control-Allow-Origin', '*')
  /*
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
  
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, project")
  
    res.setHeader("Access-Control-Allow-Credentials", "true")
  */
  // Pass to next layer of middleware
  next()
})

app.listen(80, () => console.log("Server Listening to Port 80"))

exports.app = functions.https.onRequest(app)

// post
app.post("*", (req, res) => {
  var path = req.url.split("/")

  // bracket
  /*if (req.headers.project === "bracket") {

    // storage
    if (path[1] === "storage") return require("./function/storageLocal").postFile({ req, res })

    // database
    if (path[1] === "database") return require("./function/databaseLocal").postdb({ req, res })
  }*/

  // confirmEmail
  if (path[1] === "confirmEmail") return sendConfirmationEmail({ req, res, db })

  // storage
  if (path[1] === "storage") return postFile({ req, res, db, storage })

  // database
  if (path[1] === "database") return postdb({ req, res, db, realtimedb })
})

// delete
app.delete("*", (req, res) => {
  var path = req.url.split("/")

  // bracket
  /*if (req.headers.project === "bracket") {

    // storage
    if (path[1] === "storage") return require("./function/storageLocal").deleteFile({ req, res })

    // database
    if (path[1] === "database") return require("./function/databaseLocal").deletedb({ req, res })
  }*/

  // storage
  if (path[1] === "storage") return deleteFile({ req, res, db, storage })

  // database
  if (path[1] === "database") return deletedb({ req, res, db, realtimedb, storage })
})

// get
app.get("*", async (req, res) => {
  var path = req.url.split("/")
  /*var host = req.headers["x-forwarded-host"] || req.headers["host"]
  
    // bracket
  if (myHost.includes(host)) {
    
    // storage & resources
    if (path[1] === "storage") return require("./function/storageLocal").getFile({ req, res })

    // database
    if (path[1] === "database") return require("./function/databaseLocal").getdb({ req, res })
  }*/
  
  // resources
  if (path[1] === "resources") return require("./function/storageLocal").getFile({ req, res })

  // storage
  // if (path[1] === "image") return require("./function/getImage").getImage({ req, res })

  // storage
  if (path[1] === "storage") return getFile({ req, res, db, storage })

  // database
  if (path[1] === "database") return getdb({ req, res, db, realtimedb })

  // favicon
  if (req.url === "/favicon.ico") return res.sendStatus(204)

  // respond
  return createDocument({ req, res, db, realtimedb })
})

// book a ticket
// require("./function/bookFlyBaghdad")()

// AOU
// require("./function/aou")()

// create new flight
// require("./flybaghdad/newFlight")(db)