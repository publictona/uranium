const mongoose = require('mongoose');

// mongodb assignment 1 schema

const bookSchema = new mongoose.Schema({
    bookName : String,
    authorName : String,
    category : String,
    year : Number
    
},{timestamps : true});

 

// mongodb assignment 3 schema
// 1. Write down the schemas for book and authors (keeping the data given below in mind).
// Also create the documents (corresponding to the data given below) in your database.


const authorsSchema = new mongoose.Schema({
    author_id : Number,
    author_Name : String,
    age : Number,
    address : String,
    summary :  mongoose.Schema.Types.Mixed,
    isDeleted: Boolean ,
    sales: {type: Number, default: 15},
}, {timestamps : true});


const bsSchema = new mongoose.Schema({
    bsname : String,
    bsauthor_id : Number,
    price : Number,
    ratings : Number,
    summary :  mongoose.Schema.Types.Mixed,
    isDeleted: Boolean,
    sales: {type: Number, default: 10},
}, {timestamps : true}); 


    
module.exports = mongoose.model('Book',bookSchema)
module.exports = mongoose.model('Author',authorsSchema)
module.exports = mongoose.model('Bs',bsSchema)


