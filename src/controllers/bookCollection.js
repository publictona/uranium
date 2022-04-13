const bookCollectionModel = require("../models/bookCollectionModel")


const createBook = async function(req,res) {
    let data = req.body
    let savedData = await bookCollectionModel.create(data)
    res.send({msg: savedData})
}


const bookList = async function (req, res) {
    let allBooks = await bookCollectionModel.find({bookName :string  , authorName : string}  )
    res.send({msg: allBooks})
}

const getBooksInYear = async function (req, res) {
    let allBooks = await bookCollectionModel.find({year :Number} ,{isPublished : true})
    res.send({msg: allBooks})
}


const getParticularBooks  = async function (req, res) {
    let random = req.body
    let allBooks = await bookCollectionModel.find({random})
    res.send({msg: allBooks})
}


const getXINRBooks = async function (req, res) {
    let allBooks = await bookCollectionModel.find({ $or:[ {'price.indian' :"100INR"},{'price.indian' :"200INR"},{'price.indian' :"500INR"}] 
})
    res.send({msg: allBooks})
}


const getRandomBooks = async function (req, res) {
    let allBooks = await bookCollectionModel.find( {stockAvailable : true} , {pages : {$gt :500}} )
    res.send({msg: allBooks})
}


module.exports.createBook = createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks


// create the following API’s (write logic in bookController and routes in routes):
// createBook : to create a new entry..use this api to create 11+ entries in your collection
// bookList : gives all the books- their bookName and authorName only 
// getBooksInYear: takes year as input in post request and gives list of all books published that year
// getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input
// and use it as a condition to fetch books that satisfy that condition
// e.g if body had { name: “hi”} then you would fetch the books with this name
// if body had { year: 2020} then you would fetch the books in this year
// hence the condition will differ based on what you input in the request body
// getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR” 
// getRandomBooks - returns books that are available in stock or have more than 500 pages 
