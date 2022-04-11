const express = require('express');
const router = express.Router();
const loggerModule = require('../logger/logger')
const helperModule = require('../util/helper')
const formatterModule = require('../validator/formatter')
const lodash = require('lodash')
const playersModule = require('../players/players')



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
})


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


router.get('/movies', function (req, res) {
    const arr2 = ["rand de basnasti" , "the shining", "lord of the rings", "bartman begins"]
 
 
    res.send(arr2)
    
 });
 

 //movies pronlem
 
 router.get('/movies/:indexnumber', function (req, res) {
      const value = req.params.indexnumber
 
    const arr = ["rand de basnasti" , "the shining", "lord of the rings", "bartman begins"]
    const arrlen = arr.length
    if (value < arrlen) {
       res.send(arr[value])
    } else {
       let str = "use a valid index"
       res.send(str)
    }
 
 });
 
 router.get('/films', function (req, res) {
    
    const arr4 = [
       {
          id: 1, 
          name: "The Shining"
         },
       {
          id: 2, 
          name: "lord of rings"
         },
       {
          id: 3, 
          name: "pk"
         },
       {
          id: 4, 
          name: "attack"
         },
    ]
 
   const a = arr4.map((x) => x.name).flat();{
      console.log(a)
      res.send(a)
   }
    
 });
 
 
 router.get('/films/:id', function (req, res) {
    const value = req.params.id
 
    const arr = [
       {
          id: 1, 
          name: "The Shining"
         },
       {
          id: 2, 
          name: "lord of rings"
         },
       {
          id: 3, 
          name: "pk"
         },
       {
          id: 4, 
          name: "attack"
         },
    ]
 
 
  const arrlen = arr.length
  if (value < arrlen -1) {
     res.send(arr[value])
  } else {
     let str = "use a valid index"
     res.send(str)
  }
 
 });




   
    module.exports = router;
// adding this comment for no reason