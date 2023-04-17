//define connection between node and monogodb using mongoose

//import moongoose
const mongoose = require('mongoose')

//get connection string from env 
const DB = process.env.DATABASE

//connect monogodb
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Cart Database Connected Successfully!!");
}).catch((error)=>{
    console.log(error);
})