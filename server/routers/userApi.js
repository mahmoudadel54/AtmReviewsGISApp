const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const matchPass = require('../helpers/matchPassword')
require('dotenv').config()


///express.Router is an express instance isolated from app 
//enable me to make all request methods
const userRouter = express.Router();

//put in .env file
//const PRIVATE_KEY = "sdfsdfsdjhkjhkjhnmvxnm,nvisdjfsdf"

//done
userRouter.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const newUser = new User({
            email,
            username,
            password,
        })
        await User.findOne({email},async (err, data)=>{
            if(!data){
            const createUser = await newUser.save();
            //omit function for object --> create a new object of 1st parameter, removing 
            //|| the property in the second parameter
            ///override toJSON function
            const instance = _.omit(createUser.toJSON(), "password");
            console.log(instance);
            jwt.sign({ _id: instance.id }, process.env.PRIVATE_KEY, { expiresIn: "60m" }, (err, token) => {
                console.log("Register successfully")
                instance.token = token;
                res.status(201).send(instance)
            })
        }else{
            res.status(403).send({msg:"Existing Email"})
        }
        });
        } catch (error) {
            error.status=403;
        error.message="Invalid Inputs"
        next(error)
    }
})



//login
userRouter.post('/login', async (req, res, next) => {
    try {
        //get data entered by user (email, password)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        //hash password using compare function
        //check password if true --> send token
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            //send token
            jwt.sign({ _id: user.id }, process.env.PRIVATE_KEY, { expiresIn: "60m" }, (err, token) => {
                console.log("Login successfully")
                console.log(user);
                res.send({token, username:user.username,id:user.id})
            })
        }
        else {
            let err = new Error("invalid Credentials");
            err.status = 403;
            next(err);
        }
    } catch (error) {
        return next(error)
    }
})

//get all users (first name)
userRouter.get('/', (req, res, next) => {
    try {
        //get token from headers  ---> (authorization)
        const { authorization: token } = req.headers
        //check token if verified or not
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {          //where decoded is payload
            if (err) {
                let error = new Error("Not Authorized invalid token");
                error.status = 403;
                next(error)
            }
            else
                User.find({}, { email: 1, username:1, _id: 1 }, (err, data) => {
                    if (err) {
                        return next(err);
                    } else {
                        console.log("get all users done")
                        res.status(200).send(data);
                    }
                })
        })
    } catch (error) {
        next(error)
    }
})




userRouter.delete('/', (req, res, next) => {
    try {
        //get token from headers  ---> (authorization)
        const { authorization: token } = req.headers
        //check token if verified or not
        jwt.verify(token,  process.env.PRIVATE_KEY, function (err, decoded) {          //where decoded is payload
            const {_id} = decoded;
            if (err) {
                let error = new Error("Not Authorized invalid token");
                next(error)
            }
            else {
                
                User.deleteOne({_id:_id }, (err, data) => {
                    if (err) {
                        error.status = 403;
                        return next(err)
                    } else {
                        res.send("Deleted Successfully")
                    }
                })
            }
        })
    } catch (error) {
        error.status = 500;
        next(error)
    }

})

//update done
userRouter.patch('/', (req, res, next) => {
    try{
        //get token from headers  ---> (authorization)
        const { authorization: token } = req.headers
        //check token if verified or not
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {          //where decoded is payload
            const {email} = decoded;
            console.log({decoded});
            if (err) {
                throw new Error("Not Authorized invalid token");
            }
            else {
    const { username, password } = req.body;

    const updatedUser = {
        username: username,
        password: password,
    }
    User.updateOne({ email:email }, { $set: updatedUser }, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.send("Edited Successfully")
        }
    })
}
    })
}catch(error){
        next(error)
    }
})



module.exports = {
    userRouter
}














//done
// userRouter.post('/login',(req,res,next)=>{
//     const {username, password } = req.body;
//     User.findOne({username:username},(error,data)=>{
//         if(error){
//             error.status=401
//             return next("Invalid credentials ")
//         }else{
//             if(username){

//                if(password===data.password)
//                  {res.status(200).send("Login Successfully")}
//                  else if(!password){
//                     res.send("password is required")
//                  }
//                  else{
//                     res.send("invalid credentials")
//                  }
//             }
//             else{
//                 res.send("please make sure you entered right fields")
//             }
//         }
//     })
// })



// //check token in request header
// userRouter.get('/:username', (req, res, next) => {
//     try {
//         //get token from headers  ---> (authorization)
//         const { authorization: token } = req.headers
//         //check token if verified or not
//         jwt.verify(token, PRIVATE_KEY, function (err, decoded) {          //where decoded is payload
//             if (err) {
//                 throw new Error("Not Authorized invalid token");
//             }
//             console.log(decoded.username)
//             res.send("Token is correct")
//         })
//     } catch (error) {
//         next(error)
//     }

// })



// //done
// userRouter.get('/', (req, res, next) => {


//     console.log("get all users")
//     User.find({}, { username: 1, _id: 0 }, (err, data) => {
//         if (err) {
//             return next(err);
//         } else {
//             console.log(data)

//             res.status(200).send(data);
//         }
//     })
// })


// userRouter.delete('/:id', (req, res, next) => {
//     const { params: { id } } = req;
//     console.log(555);
//     User.deleteOne({ _id: id }, (err, data) => {
//         if (err) {
//             return next(err)
//         } else {
//             res.send("Deleted Successfully")
//         }
//     })
// })


// //update done
// userRouter.patch('/:id', (req, res, next) => {
//     const { username, password, firstName, age } = req.body;
//     const { params: { id } } = req;

//     const updatedUser = {
//         username: username,
//         password: password,
//         firstName: firstName,
//         age: age
//     }
//     User.updateOne({ _id: id }, { $set: updatedUser }, (err, data) => {
//         if (err) {
//             return next(err)
//         } else {
//             res.send("Edited Successfully")
//         }
//     })
// })
