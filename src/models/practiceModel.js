const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//assignment auth branch-=session/auth
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const userSchema= mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     Mobile : Number,
//     emailId: String,
//     password :String,
//     gender : {type:String, enum:["male", "female","other"]} ,
//     isDeleted : {type : Boolean ,default :false},
//     age : Number,
    
// }, {timestamps:true})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//assignment header middleware
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const userSchema = new mongoose.Schema({
//     name :String,
//     balance : {type: Number, default:100},
//     address : String,
//     age : Number,
//     gender :{type: String, enum :['male','female','others']},
//     isFreeAppUser : {type:Boolean, default: false}
// },{timestamps: true})

// const productSchema = new mongoose.Schema({
//     name: String,
//     category: String,
//     price: { type: Number, required: true}
// } ,{timestamps:true});
    
// const orderSchema = new mongoose.Schema({
//     userId :{type: ObjectId ,ref: 'User'},
//     productId : {type: ObjectId, ref:'Product'},
//     amount :Number,
//     isFreeAppUser: Boolean,
//     date: {type:Date,default:Date.now(),}
// },{timestamps:true});


// const user0 = mongoose.model('Authuser0',userSchema)
// const user = mongoose.model('User', userSchema) 
// const product = mongoose.model('Product', productSchema) 
// const order = mongoose.model('Order', orderSchema) 


// // module.exports ={user0}
// module.exports = {user, product, order}

/////////////////////////////////////////////////////////////////


const userSchema = mongoose.Schema({
    name: String,
	balance:{type: Number, default: 100},
	address:String,
	age: Number,
 	gender: {type: String, enum: ['male', 'female', 'others']},
	isFreeAppUser: {type: Boolean, default: false}
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    name:String,
	category:String,
	price:{type: Number, required: true}
}, { timestamps: true });
    
const orderSchema = new mongoose.Schema({
    userId: {type: ObjectId, ref: 'User'},
	productId: {type: ObjectId, ref: 'Product'},
	amount: Number,
	isFreeAppUser: Boolean, 
	date: {type: Date, default: Date.now(),}
}, { timestamps: true });

const user = mongoose.model('User', userSchema) 
const product = mongoose.model('Product', productSchema) 
const order = mongoose.model('Order', orderSchema) 

module.exports = {user, product, order}