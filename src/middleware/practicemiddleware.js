//Q auth middleware token
const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const authCheck0 = async (req,res,next) => {
    try{
        let id = req.params.userId
        if(!mongoose.isValidObjectId(req.params.userId)) return res.send({msg:"invalid userid sent in params"})
        let token= req.headers['x-Auth_token']||req.headers['x-auth-token']
        if(!token) return res.send({msg : 'token required to login credentials please send it'})
        let tokenValidity = jwt.verify(token,"what you eat first chicken or biryani ??!")
        if (tokenValidity.userId !==id)return res.send({msg : "this user is not authorized yet"})
        next()

    }
    catch{
        res.status(400).send({status:false,msg:'invalid token, unable to verify person.Please re-log in'})
    }
}

//middleware header
const headerCheck = async (req, res, next) => {
    const header = req.headers.isfreeappuser || req.headers.isFreeAppUser //some client send header as it is and some with lowercase so thi checks both our conditions
    if(header){
        if(header === "true")
        req['isFreeAppUser'] = true //we can do 'req.isFreeAppUser = true' as well. same thing
        // req['isFreeAppUser'] = JSON.parse(header) // This way also we can write line 5
        if(header === "false")
        req['isFreeAppUser'] = false //in [] notation the value is considered to be a variable that's why we write the 'isFreeAppUser' with single/double quote to make it a string 
    next()
    }
    else res.send({msg: "An usefull header is missing"})
}

module.exports = {headerCheck}
module.exports = {authCheck0}

