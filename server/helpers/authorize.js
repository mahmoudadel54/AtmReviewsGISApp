const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = function(req, res, next){
    const token = req.header("authorization");
    if(!token){
        return res.status(403).json({msg: "authorization denied"})
    }
    try {
        const verify = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = verify._id;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}