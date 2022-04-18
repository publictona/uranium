const express = require('express');
const router = express.Router();

const bookController = require("../controllers/bookController")



  // assigment 4 new author ,publisher book
  
router.post("/createAuthor", bookController.createAuthor)
router.post("/createPublisher", bookController.createPublisher)
router.post("/createBook", bookController.createBook)
router.get("/findBook", bookController.findBook)
router.put("/updateBook", bookController.updateBook)
router.put("/updateBookPrice", bookController.updateBookPrice)
router.put("/updateB", bookController.updateB)


module.exports = router;
  // adding this comment for no reason