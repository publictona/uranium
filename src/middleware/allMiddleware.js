const jwt = require('jsonwebtoken')
const blogModel = require("../models/blogModel")


const authentication = async function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (!token) token = req.headers["X-Auth-Token"]

    if (!token) {
        res.status(401).send({ error: "no token found" })
    }

    let decodeToken = jwt.verify(token, "functionup-uranium")
    if(!decodeToken){
        res.send({error:"Invalid token"})
    }
    

    next();

}


// const mid2 = async function (req, res, next) {
//     let token = req.headers["x-auth-token"]
//     if (!token) token = req.headers["X-Auth-Token"]

//     if (!token) {
//         res.status(401).send({ error: "no token found" })
//     }

//     let decodeToken = jwt.verify(token, "functionup-uranium")
//     console.log(decodeToken)

//     let blogId = req.params.blogsId
//     console.log(userToken)
//     let userId = decodeToken.userId
//     console.log(userId+"----I am priented")


//     let blog = await blogModel.findById({ _id: blogId })
//     console.log(blog[0].authorId)


//     if (userId != blog[0].authorId) {
//         res.status(401).send({ error: "you are not authourized to change other user document " })
//     }
//     next();

// }


// const mid3 = async function (req, res, next) {

//     let { authorsId, tags, category, subcategory, isPublished } = req.query

//     if (!req.query) {
//         res.status(401).send({ error: "no filter given" })
//     }

//     let blog = await blogModel.find({
//         $or: [{ authorId: authorsId },
//         { isPublished: isPublished },
//         { tags: tags },
//         { category: category },
//         { subcategory: subcategory }]
//     })

//     let newToken = req.decodeToken.userId
//     console.log(newToken)


//     if (newToken != blog[0].authorId) {
//         
//     }
//     next();

// }

const deleteBlogById=async(req,res,next)=>{
    let token = req.headers["x-auth-token"||"X-Auth-Token"]
    let decodedToken = jwt.verify(token,"functionup-uranium")
    let Id = req.params.blogsId
    let blog = await blogModel.find({_id:Id})
    console.log(decodedToken.userId)
    if(blog[0].authorId!=decodedToken.userId){
        res.status(401).send({ error: "you are not authourized to change other user document " })
    }
    next()
}


const deleteBlogbyParams= async (req,res,next)=>{
     let token = req.headers["x-auth-token"]
     let decodedToken = jwt.verify(token,"functionup-uranium")
     let { authorId, isPublished, tags, category, subcategory } = req.query
     let blog = await blogModel.find({$or:[{authorId:authorId},{isPublished:isPublished},{tags:tags}, {category:category}, {subcategory:subcategory}]})
     if(blog[0].authorId!=decodedToken.userId){
         res.status(401).send({ error: "you are not authourized to change other user document " })
     }
     next()
}


module.exports.deleteBlogbyParams = deleteBlogbyParams
module.exports.authentication = authentication
module.exports.deleteBlogById = deleteBlogById

// module.exports.mid1 = mid1
// module.exports.mid2 = mid2
// module.exports.mid3 = mid3