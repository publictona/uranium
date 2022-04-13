const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    bookName : {
        type : String,
        required :true,
},

    authorName : String,
    category : String,
       
    tags :[String],
    
    price : {
        indian : String,
        europe : String,
},
    year : { type:Number,default:2021},

    sales : {type:Number ,default:5},
    stockAvailable : Boolean,
    pages : Number,
    localStorage : Boolean,

},{timestamps : true});

module.exports = mongoose.model('BookCollection',bookSchema)

// Assignment :
// Create a books collection in your DB ( using bookModel with following fields)- bookName( mandatory field), 
// price containing Indian and european price, year ( should be 2021 if no year is provided) , tags array, 
// authorName, totalPages , stockAvailable ( true false) 
//localStorage

