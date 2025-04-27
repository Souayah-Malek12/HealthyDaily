const jwt = require("jsonwebtoken")

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

module.exports = {requireSignIn}