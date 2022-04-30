const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
const jwt   =require("jsonwebtoken")


const createBlog = async function (req, res) {
  try {
    let data = req.body
    let checkId = data.authorId
    let myTitle = data.title
    let myBody = data.body
    let myCategory = data.category

    if (!myTitle) {
      res.status(401).send({ error: "Title missing" })
    }

    if (myTitle.length < 2) {
      res.status(401).send({ error: "length of title must be greater than 2" })
    }

    if (!myBody) {
      res.status(401).send({ error: "Body missing" })
    }

    if (myBody.length < 50) {
      res.status(401).send({ error: "length of body must be greater than 50" })
    }

    if (!myCategory) {
      res.status(401).send({ error: "category is missing" })
    }

    console.log(checkId)
    if (!checkId) {
      return res.status(401).send({ msg: 'please enter authorId' })
    }

    let validId = await authorModel.findById(checkId)
    if (!validId) {
      return res.status(401).send({ msg: 'authorId is not correct' })
    }

    let savedData = await blogModel.create(data)
    res.status(201).send({ data: savedData })
  }

  catch (err) {
    console.log(err)
    res.status(500).send({ err: err.message })
  }
}


const getBlogs = async (req, res) => {
  try {

    let { authorId, tags, category, subcategory } = req.params
    console.log(req.query);
    if (!req.query) {
      res.status(401).send({ error: "no query is present" })
    }

    let blog = await blogModel.find({
      isPublished: true, isDeleted: false, $or: [{ authorId: authorId },
      { tags: tags },
      { category: category },
      { subcategory: subcategory }]
    })
    console.log(blog);
    if (!blog[0]) {
      res.status(404).send({ err: 'data not found' })
    }
    res.status(200).send({ msg: blog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err: 'server not found' })
  }
}


const updateBlog = async (req, res) => {
  try {
    // const { id, tags, subcategory} = data  and $addtoset
    let data = req.body
    let Id = req.params.blogsId
    let tags = req.body.tags
    let subcategory = req.body.subcategory
    let user = await blogModel.findById(Id)
    let updatedTags = user.tags
    if (tags) {
      updatedTags.push(tags)
    }
    // updatedTags.push(tags)
    let updatedSubCategory = user.subcategory
    if (subcategory) {
      updatedSubCategory.push(subcategory)
    }
    // updatedSubCategory.push(subcategory)
    console.log(data)

    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: Id  },
      {
        title: data.title,
        tags: updatedTags,  // don't know why null is coming up in response when you only want to update subcategory
        subcategory: updatedSubCategory, // don't know why null is coming up in response when you update only tags 
        body: data.body,
        isPublished:data.isPublished
      },
      { returnDocument: 'after' },
    )
    console.log(updatedBlog)
    if (!updatedBlog) {
      res.status(404).send({ error: 'Document not found / already deleted' })
    }
    res.status(200).send({ Updates: updatedBlog })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}




const deleteBlog = async (req, res) => {
  try {
    let Id = req.params.blogsId

    let deletedDoc = await blogModel.findOneAndUpdate(
      { _id: Id, isDeleted:false },
      { isDeleted: true, deletedAt: Date() },
      { returnDocument: 'after' },
    )
    console.log(deletedDoc)
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found with Given Id/ Already deleted' })
    }
    res.status(200).send({ Updates: deletedDoc })
  } catch (err) {
    console.log(err)
    res.status(500).send({ msg: err.message })
  }
}



const deleteByParams = async (req, res) => {
  try {
    let decodedToken = jwt.verify(req.headers["x-auth-token"],"functionup-uranium")

    let { authorsId, isPublished, tags, category, subcategory } = req.query


    // const isAuthor = await authorModel.findById(authorsId)
    if (!req.query) {
      return res
        .status(404)
        .send({ error: 'Inavlid Input---Query shoud not be emplpty' })
    }

    let deletedDoc = await blogModel.updateMany({
      isDeleted: false, authorId: decodedToken.userId,$or: [{ authorId: authorsId },
      { isPublished: isPublished },
      { tags: tags },
      { category: category },
      { subcategory: subcategory }],
    },
      { isDeleted: true, deletedAt: Date()}, { returnDocument: 'after' })
    console.log(deletedDoc)
    if (!deletedDoc) {
      res
        .status(404)
        .send({ error: 'Document not found / given data not exists/ is Already Deleted' })
    }
    res.status(200).send({ Updates: deletedDoc })

    const withTags = blogModel.findOneAndUpdate({ tags: { $contains: tags } }, { isDeleted: true, deletedAt: Date() }, { returnDocument: 'after' })

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
