
//Loads .env file contents into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
//import connection.js file to connect monogodb
require('./db/connection')
//import router
const router = require('./routes/router')

//Create server app using express
const server = express()

//Use cors and express.json() to your server app
//application specific middleware
server.use(cors())
server.use(express.json())
//use router in server
server.use(router)
//Create port to listen your server app
const PORT = process.env.PORT || 3000

//api test
server.get('/',(req,res)=>{
    res.status(200).json("E Cart Server Started")
})


//Run server app in ther specifie port
server.listen(PORT,()=>{
    console.log(`E cart server started at port: ${PORT}`);
})