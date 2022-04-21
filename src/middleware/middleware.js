const headerCheck = async (req,res,next) => {
    const header = req.headers.isFreeappUser || req.headers.isFreeAppUser // it is applicable for both client those who are sending header in lower as well as upper case
    if(header){
        if(header === "true")
        req['isFreeAppUser'] = true //or req.isFreeappUser = true //or//  req["isFreeAppUser"] = JSON.parse(header)
        if(header === "false")
        req['isFreeAppUser'] = false //if we are write value in this bracket [] so it is consider as variable but we want string so we write this single o r double quote
    next() 
    }
    else res.send({msg: "An usefull Header is missing you have to try again and write header "})

}

module.exports ={ headerCheck}