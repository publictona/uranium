const BlogModel = require('../Models/BlogModel')
const authorModel = require('../Models/AuthorModel')
const res = require('express/lib/response')
const jwt = require('jsonwebtoken')

const createBlog = async function (req, res) {
  try {
  let data = req.body
  let checkId = data.authorId
  let myTitle = data.title
  let myBody = data.body
  let myCategory = data.category

  if (!myTitle) {
    res.status(401).send({error : "Title missing"})
  }
  if (myTitle.length<2) {
    res.status(401).send({error : "length of title must be greater than 2"})
  }
 
  if (!myBody) {
    res.status(401).send({error : "Body missing"})
  }
  if (myBody.length<50) {
    res.status(401).send({error : "length of body must be greater than 50"})
  }

  if (!myCategory){
    res.status(401).send({error: "category is missing"})
  }
  
  console.log(checkId)
  if (!checkId) {
    return res.status(401).send({ msg: 'please enter authorId' })
  }
  let validId = await authorModel.findById(checkId)
  if (!validId) {
    return res.status(401).send({ msg: 'authorId is not correct' })
  }

  let savedData = await BlogModel.create(data)
  res.status(201).send({ data: savedData })
} 
 
catch (err) {
  console.log(err)
  res.status(500).send({ err: 'server not found' })
}
}

const getBlogs = async (req, res) => {
  try {
    let myAuthor = req.query.authorsId
    let myCategory = req.query.category
    if (!myAuthor || !myCategory) {
      res.status(401).send({error : "authorId and category is not present"})
    }

    if (!(myAuthor.match(/^[0-9a-fA-F]{24}$/))) {
      res.status(401).send({error: "authors Id is not valid"})
      // Yes, it's a valid ObjectId, proceed with `findById` call. 
    }

    let data = await BlogModel.find({ isPublished: true, isDeleted: false })
    console.log(data)
    if (!data) {
      res.status(404).send({ err: 'data not found' })
    }
    res.status(200).send({ msg: data })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'server not found' })
  }
}

const updateBlog = async (req, res) => {
  try {

    const isAuthorized = function(token, userId){
 
    
      let deCodedToken = jwt.verify(token, "functionUp-Uranium")
      if(deCodedToken.userId!=userId){
        console.log("Iam decoded Id"+ deCodedToken.userId);
        return false
      }
      return true
  }

    let Data = req.body
    let Id = req.params.blogsId
    let tags = req.body.tags
    let subcategory = req.body.subcategory
    console.log(Data);
    let blog = await BlogModel.findById(Id)
    let updatedTags = blog.tags
    if (tags) {
      updatedTags.push(tags)
    }
    // updatedTags.push(tags)
    let updatedSubCategory = blog.subcategory
    if (subcategory) {
      updatedSubCategory.push(subcategory)
    }
    // updatedSubCategory.push(subcategory)
    console.log(Data)
    let token = req.headers["x-auth-token"]
    if(!token){
        token = req.headers["X-Auth-Token"]
    }
  
    let isuserAuthorized = isAuthorized(token,blog.authorId)
    
    if(!isuserAuthorized){
      res.status(404).send({ error: 'you are not authorized' })
    }

    let updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: Id },
      {
        title: Data.title,
        tags : updatedTags,  // don't know why null is coming up in response when you only want to update subcategory
        subcategory: updatedSubCategory, // don't know why null is coming up in response when you update only tags 
        body: Data.body,
      },
      { returnDocument: 'after' },
    )
    console.log(updatedBlog)
    if (!updatedBlog) {
      res.status(404).send({ error: 'Document not found' })
    }
    res.status(200).send({ Updates: updatedBlog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}


const deleteBlog = async (req, res) => {
  const isAuthorized = function(token, userId){
    let deCodedToken = jwt.verify(token, "functionUp-Uranium")
    if(deCodedToken.userId!=userId){
     
      return false
    }
    return true
}
  try {
    let Id = req.params.blogId
    console.log(Id);

    if (!(Id.match(/^[0-9a-fA-F]{24}$/))) {
      res.status(401).send({error: "authors Id is not valid"})
      // Yes, it's a valid ObjectId, proceed with `findById` call. 
    }
    console.log(Id)
    if (Id.length != 24) {
      return res
        .status(401)
        .send({ error: 'Inavlid Id---Invalid Length of Id' })
    }
    const isBlog = BlogModel.find({ _id: Id , isDeleted:false})
    console.log(isBlog+"-------here I am");
    if (!isBlog) {
      return res
        .status(404)
        .send({ error: 'Inavlid Id or Already deleted' })
    }

    let token = req.headers["x-auth-token"]
    if(!token){
        token = req.headers["X-Auth-Token"]
    }
  
    let isuserAuthorized = isAuthorized(token,isBlog.authorId)
    
    if(!isuserAuthorized){
      res.status(404).send({ error: 'you are not authorized' })
    }

    let deletedDoc = await BlogModel.findOneAndUpdate(
      { _id: Id },
      { isDeleted: true, deletedAt: Date() },
      { returnDocument: 'after' },
    )
    console.log(deletedDoc)
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found with Given Id/ Id Inavlid' })
    }
    res.status(200).send({ Updates: deletedDoc })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}






const deleteByParams = async (req, res) => {
  try {
    
      const isAuthorized = function(token, userId){
        let deCodedToken = jwt.verify(token, "functionUp-Uranium")
        if(deCodedToken.userId!=userId){
         
          return false
        }
        return true
    }
    let {authorsId, isPublished, tags, category, subcategory}  =req.query

    
    // const isAuthor = await authorModel.findById(authorsId)
    if (!req.query) {
      return res
        .status(404)
        .send({ error: 'Inavlid Input---Query shoud not be emplpty' })
    }

    let Blog = await BlogModel.find({$or:[  { authorId: authorsId },
      { isPublished: isPublished },
      { tags: tags },
      { category:category },
      { subcategory:subcategory }]})

      let token = req.headers["x-auth-token"]
    if(!token){
        token = req.headers["X-Auth-Token"]
    }
    if(!token){
      res.status(404).send({ error: 'no token in header' })
    }
  
    let isuserAuthorized = isAuthorized(token,Blog.authorId)
    
    if(!isuserAuthorized){
      res.status(404).send({ error: 'you are not authorized' })
    }
    let deletedDoc = await BlogModel.findOneAndUpdate({isDeleted:false, $or:[  { authorId: authorsId },
            { isPublished: isPublished },
            { tags: tags },
            { category:category },
            { subcategory:subcategory }]},
              { isDeleted: true, deletedAt: Date() } ,  { returnDocument: 'after' })
    console.log(deletedDoc)
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found / given data not exists/ is Already Deleted' })
      }
      res.status(200).send({ Updates: deletedDoc })

      const withTags = BlogModel.findOneAndUpdate({ tags:{ $contains : tags } },{ isDeleted: true, deletedAt: Date() } ,  { returnDocument: 'after' })

      console.log(withTags);
    } catch (err) {
      console.log(err)
      res.status(500).send({ msg: err.message })
    }
  }
  



 
module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteByParams = deleteByParams 