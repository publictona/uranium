const express = require('express')
const router = express.Router()
const blogController = require('../Controller/blogController')
const authorController = require('../Controller/authorController')
const middle = require('../middleware/allMiddleware')

router.post('/authors', authorController.createAuthor)

router.post('/blogs', middle.authentication , blogController.createBlog)

router.get('/getblogs',middle.authentication  ,blogController.getBlogs)

router.put('/blogs/:blogsId',middle.authentication, middle.deleteBlogById,  blogController.updateBlog)

router.put('/deleteblogs/:blogsId', middle.authentication, middle.deleteBlogById, blogController.deleteBlog)

router.put('/delete', middle.authentication, middle.deleteBlogbyParams,  blogController.deleteByParams)

<<<<<<< HEAD
router.post('/login', authorController.loginUser )
=======
router.put('/delete', blogController.deleteByParams)
>>>>>>> 2f36dccaa97d28af1522bc6f8d70a7180d35abf3

module.exports = router    
   