require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

const app = express();
mongoose.connect(process.env.CONNECTION_DB,{useNewUrlParser:true ,useUnifiedTopology:true},(err)=>{
    if(err){
        //it is for exit connection in case of error
        console.error(err)
        process.exit();
    }
    console.log("Connection successfully")
    app.listen(process.env.PORT,()=>{
        console.log("app listening at http://localhost:5000")
    })
})

module.exports = app





