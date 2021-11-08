
const mongoose = require('mongoose')
const {Schema} = mongoose;
const hashingFunc = require('../helpers/hashing')

const userSchema = mongoose.Schema({
    email: { type: String, required: true,match: /.+\@.+\..+/,unique: true},
    password: { type: String, required: true },
    username: { type: String, required: true, minlength: 3, maxlength: 15 },
    role:{type:String, required:true, default:"user"}           //user or admin
},{timestamps: { createdAt: true, updatedAt: true }})

userSchema.pre('save', async function(next) {
    const userDocument = this;
    const {password} = userDocument;
    //check if pass is changes
    if(userDocument.isModified("password")){
        const hashedPassword = await hashingFunc(password)
        userDocument.password= hashedPassword;
    }
    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User
