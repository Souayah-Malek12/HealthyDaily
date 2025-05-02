const jwt = require("jsonwebtoken")
const userModel = require('../Models/user');

const requireSignIn = (req, res, next)=> {
    try{    
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized, token missing' });
        }
        const decode = jwt.verify(token, process.env.SECRET);
        req.user = decode.id;
        next();
    }catch(error){
        console.log(error)
    }

}

const isAdmin =async(req, res, next)=>{
    try{
        console.log(req.user)
        const user = await userModel.findById(req.user);
        if(!user || user.role !== "Administrator"){
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access(Only Administrator",
              }); 
        }
        next();
    }catch(err){
        console.log("isAdmin middleware error",err)
    }
}

module.exports = {requireSignIn, isAdmin}