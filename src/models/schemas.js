const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = mongoose.Schema({
    name: String,
    balance :{type: Number , default :100},
    address :String,
    age :Number,
    gender :{type:String, enum :["male", "female", "other"]},
   isFreeAppUser : {type :Boolean, default: false}
}, { timestamps: true })


const productSchema = mongoose.Schema({
    name : String,
    category : String,
    price : {
        type : Number,
        required: true
    }
}, { timestamps:true })


const orderSchema = mongoose.Schema({
    user_Id :{type :ObjectId, ref:"User"} ,
    Product_Id :{type :ObjectId, ref:"Product"},
    amount : Number,
    isFreeAppUser : Boolean,
    date : {type :Date, default:Date.now(),}

 }, { timestamp :true})



 const user = mongoose.model('User' ,userSchema)
 const product = mongoose.model('Product' ,productSchema)
 const order = mongoose.model('Order' ,orderSchema)
 module.exports = { user, product, order}
 
 
 
    


