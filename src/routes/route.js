const express = require('express');
const router = express.Router();
const loggerModule = require('../logger/logger')
const helperModule = require('../util/helper')
const formatterModule = require('../validator/formatter')
const lodash = require('lodash')
const bookController = require("../controllers/bookController")
const bookCollection = require("../controllers/bookCollection") 



router.get('/test-me', function (req, res) {
    loggerModule.welcomeMessage()
    helperModule.printTodaysDate()
    helperModule.printCurrentMonth()
    helperModule.printBatchInformation()
    formatterModule.trimString()
    formatterModule.changeCaseToUpper()
    formatterModule.changeCaseToLower()
    res.send('My first api !')
});

router.post('/add-player', function(req,res){
playersModule.players()
res.send(players)
});


router.get('/hellow', function (req, res) {
// Problem a)

let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let subArrays = lodash.chunk(months, 3)
console.log('The result after splitting the months array is ', subArrays)

// Problem b)

let oddNumbers = [1,3,5,7,9,11,13,15,17,19]
console.log('The last 9 odd numbers in the array are: ', lodash.tail(oddNumbers))

// Problem c)
let a = [1 , 2, 1, 4]
let b = [2, 3, 4, 3]
let c = [6, 1, 5, 10]
let d = [1, 1, 1]
let e = [1, 2, 3, 4, 5]

console.log('Final array or unique numbers is : ', lodash.union(a, b, c, d, e))

// Problem d)
let arrayOfKeyValuePairs = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
console.log('The object created from arrays is :', lodash.fromPairs(arrayOfKeyValuePairs))
    res.send('My hello api!')
});



    


//  Q@ BookSchema

router.get('/book', function (req, res) {
  res.send('my Book shop!!')
});

router.post('/createBook',bookController.createBook);
router.get('/getAllBook', bookController.getBooksData);
   

router.get('/bookCollection', function (req, res) {
  res.send('This is my Book collection!!')
});

router.post('/createBook',bookCollection.createBook);
router.post('/bookList', bookCollection.bookList);
router.post('/getBooksInYear', bookCollection.getBooksInYear);
router.get('/getParticularBooks', bookCollection.getParticularBooks);
router.get('/getXINRBooks', bookCollection.getXINRBooks);
router.get('/getRandomBooks', bookCollection.getRandomBooks);
   
   

 module.exports = router;
// adding this comment for no reason