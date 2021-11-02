const bycrpt = require('bcryptjs') 

const SALT_Round = 10;
module.exports = async (text)=>{
    return bycrpt.hash(text,SALT_Round)
}