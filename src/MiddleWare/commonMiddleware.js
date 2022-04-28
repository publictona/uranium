const jwt = require("jsonwebtoken")



const authUser = (req,res,next)=>{
    let token = req.headers["x-auth-token"]
    if(!token){
        token = req.headers["X-Auth-Token"]
    }
    if(!token){
        res.send({msg:"token not found"})
    }
    let isValidToken = jwt.verify(token, "functionUp-Uranium")
    console.log({isValidToken:isValidToken});

    if(!isValidToken){
        res.send({msg:"token invalid"})
    }
    next()
}



module.exports.authUser = authUser