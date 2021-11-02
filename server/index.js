const express = require('express')              ///it is better to order all require like 
const fs = require('fs')                        //|| built in modules --> then (npm) modules --> (../) modules
const morgan = require('morgan')
const path = require('path')
const authorize = require('./helpers/authorize')
const {reviewRouter} = require('./routers/reviewApi')
const {userRouter} = require('./routers/userApi')
const app = require('./database/server')
const { atmRouter } = require('./routers/atmApi')

//body parsing
app.use(express.json())

////logging 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

///we can array of paths 
app.use(['/reviews','/review'],authorize,reviewRouter)
app.use(['/users','/user'],userRouter)
app.use(['/atms','/atm'],authorize,atmRouter)


//for page not found
app.use((req,res,next)=>{
    const error = new Error("Page not found")
    error.status = 404
    next(error);
})


//global error handler==> it must take 4 parameters
app.use((err,req,res,next)=>{
    if(err.status <= 500) {
        return res.status(err.status).send(err.message)
    }
    res.status(500).send("Internal Server error")
})

