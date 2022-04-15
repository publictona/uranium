const bookModel = require("../models/bookModel")


const createBook = async function(req,res) {
    let data = req.body
    let savedData = await bookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData = async function (req, res) {
    let allBooks = await bookModel.find()
    res.send({msg: allBooks})
}


// # mongoDB problem 3

////# 1. CRUD operations. Write API's to do the following:
// Write create APIs for both books and authors 
//---> If author_id is not available then do not accept the entry(in neither the author collection
// nor the books collection)

const createAuthor = async function (req, res) {
    let data= req.body
    let allAuthors = await BookModel.find({author_id : Number})
    console.log(allAuthors)
    if(allAuthors.length > 0) req.send({msg:allAuthors,condition:true})
    else res.send({msg: "No books found" ,condition:false})
}

const createBs = async function (req, res) {     //(Bs==books)
    let data= req.body
    let allBsauthors = await BookModel.find({ bsauthor_id : Number})
    console.log(allBsauthors)
    if(allBsauthors.length > 0) req.send({msg:allBsauthors,condition:true})
    else res.send({msg: "No books found" ,condition:false})

}

//#2  List out the books written by "Chetan Bhagat" ( this will need 2 DB queries one
// after another- first query will find the author_id for "Chetan Bhagat”. Then next query will get 
//the list of books with that author_id )
const getChetanData = async function (req, res) {
    const data = await  bookModel.find({author_Name : "Chetan Bhagat"})
    let  bookName  = await bookModel.find({ author_id : Number})
    res.send({msg:  bookName })
}

//#3 find the author of “Two states” and update the book price to 100;  Send back the author_name and
// updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. 
//The second will be a find query aith author_id from previous query)
const updatePrice = async function (req, res) {
    const data = await  bookModel.find({bsname :Twostates })
    let  bsname  = await bookModel.find({bsauthor_id : Number}).select({bsname :Twostates})
    let priceUpdate    = await bookModel.findOneAndUpdate({ bsname :Twostates},{price :100},{new:true}).select({bsauthor_id : Number})
    res.send({msg: bsName , priceUpdate })
}

// *4 Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of
// respective books..
//bookModel.find( { price : { $gte: 50}  ,  price: {$lte: 100} } ) // WRONG
// bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ author_id :1})..run a map(or forEach)
//  loop and get all the authorName corresponding to the authorId’s ( by querying authorModel)
const costBetween = async function (req, res) {
    const data = await  bookModel.find({ price : { $gte: 50, $lte: 100} } ).select({ author_id :Number})
    const id = data.map(x =>x.author_id)
    let arr =[]
    for (let i = 0; i<id.length; i++){
        let K = id[i]
        const author = await bookModel.find({author_id :K}).select({author_Name : String},{author_id :Number})
        arr.push(author)
    }
    const authorname = arr.flat()
    res.send({msg : authorname})

}



module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
//mongodb assign3
module.exports.createAuthor =createAuthor
module.exports.createBs = createBs
module.exports.getChetanData = getChetanData
module.exports.updatePrice = updatePrice
module.exports.costBetween = costBetween 

