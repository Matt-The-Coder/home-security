require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
const origin = process.env.ORIGIN
const origin2 = process.env.ORIGIN2
const http = require('http');
const { Server } = require('socket.io')
const path = require('path')
const db = require('./database/connection')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const VITE_MAPBOX_API = "pk.eyJ1Ijoibm9haGtseWRlMTciLCJhIjoiY2xvZTF3djYwMDczdTJtcGY3dXdibHR4aSJ9.0VgWjkWc6WcgV4DarLZTGw"
app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'images')))


app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
  name: 'MyKargadaOnly', // This needs to be unique per-host.
  cookie: {
    secure: false, // required for cookies to work on HTTPS
    httpOnly: false,
    sameSite: 'lax'
  }
}))

var corsOptions = {
  origin: [origin, origin2],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

const authRoute = require('./routes/authRoute');



app.use(authRoute)


app.get("/test", (req,res)=>{
  res.json({message:"HEllo"})
})
app.get("/getUsers", async (req, res)=>{
  const query = "Select * from users"
  const result = await db(query)
  console.log(result)
  res.json(result)
})
app.delete("/removeUser/:id", async (req, res)=>{
  const query = `Delete from users where user_id = ${req.params.id}`
  const result = await db(query)
  console.log(result)
  res.json(result)
})
app.get("/getDevices", async (req, res)=>{
  const query = "Select * from devices"
  const result = await db(query)
  console.log(result)
  res.json(result)
})
app.post("/registerDevice", async (req, res)=>{
  const {deviceName, status, username} = req.body
  const query = `INSERT into devices(device_name,	status,	created_by) values('${deviceName}','${status}', '${username}')`
  const result = await db(query)
  console.log(result)
  res.json(result)
})
app.delete("/removeDevice/:id", async (req, res)=>{
  const query = `Delete from devices where device_id = ${req.params.id}`
  const result = await db(query)
  console.log(result)
  res.json(result)
})
app.listen(port, async () => {
  console.log(`Server started at port ${port}`)

})