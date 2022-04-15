const express = require('express');
const router = express.Router();
const loggerModule = require('../logger/logger')
const helperModule = require('../util/helper')
const formatterModule = require('../validator/formatter')
const lodash = require('lodash')
const bookController = require("../controllers/bookController")
const bookCollection = require("../controllers/bookCollection") 




//schema
// assignment1  BookSchema


router.get('/book', function (req, res) {
    res.send('my Book shop!!')
  });
  
  router.post('/createBook',bookController.createBook);
  router.get('/getAllBook', bookController.getBooksData);
     
  //assignment2 book collection
  router.get('/bookCollection', function (req, res) {
    res.send('This is my Book collection!!')
  });
  
  router.post('/createBook',bookCollection.createBook);
  router.post('/bookList', bookCollection.bookList);
  router.post('/getBooksInYear', bookCollection.getBooksInYear);
  router.get('/getParticularBooks', bookCollection.getParticularBooks);
  router.get('/getXINRBooks', bookCollection.getXINRBooks);
  router.get('/getRandomBooks', bookCollection.getRandomBooks);

  //assignment 3 book and author

  router.post('/createAuthor',bookCollection.);
  router.post('/bookList', bookCollection.bookLcreateAuthorist);
  router.post('/getBooksInYear', bookCollection.getBooksInYear);
  router.get('/getParticularBooks', bookCollection.getParticularBooks);
  router.get('/getXINRBooks', bookCollection.getXINRBooks);
  router.get('/getRandomBooks', bookCollection.getRandomBooks);


     
  createAuthor =createAuthor
  module.exports.createBs = createBs
  module.exports.getChetanData = getChetanData
  module.exports.updatePrice = updatePrice
  module.exports.costBetween = costBetween 
  
  
   
  
  
  
  
  
  
  
  
  
  module.exports = router;
  // adding this comment for no reason