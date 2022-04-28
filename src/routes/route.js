const express = require('express')
const router = express.Router()
const blogController = require('../Controller/blogController')
const authorController = require('../Controller/authorController')
const middleware = require('../MiddleWare/commonMiddleware')

router.post('/authors', authorController.createAuthor)

router.post("/login", authorController.Login)

router.post('/blogs', blogController.createBlog)

router.get('/getblogs', blogController.getBlogs)

router.put('/blogs/:blogsId',middleware.authUser, blogController.updateBlog)

router.put('/deleteblogs/:blogsId',middleware.authUser, blogController.deleteBlog)

router.put('/delete',middleware.authUser, blogController.deleteByParams)

module.exports = router
