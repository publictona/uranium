//auth assign
//const { user0 } = require("../models/practiceModel")
// const {user,product,order} = require("../models/practiceModel")
// const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken')


// const createUser0 = async (req, res) => {
//     let data = req.body
//     if (!await user0.exists(data)) {
//         let savedData = await user0.create(data)
//         res.status(400).send({ msg: savedData })
//     }
//     else res.send({ msg: "this user already exists." })
// }

// const loginUser0 = async (req, res) => {
//     let data = req.body
//     let user0Data = await user0.findOne({ emailId: data.emailId, password: data.password })
//     if (user0Data) {
//         let token = jwt.sign({
//             user0Id: user0Data._id.toString(),
//             firstName: user0.firstName,
//             age: user0.age
//         }, "what you eat first chicken or biryani ??!")
//         res.setHeader("x-Auth-Token", token)
//         res.send({ msg: token })
//     }
//     else res.send({ status: false, msg: "this users data does not exists in the database" })

// }

// const fetchUser0 = async (req, res) => {
//     let user0Details = await user0.findById(req.param.user0Id)
//     if (!user0Details) return res.send({ msg: "user does not exists in the DB" })
//     if (!user0Details.isDeleted) return res.send({ status: true, data: user0details })
//     res.send({ msg: "You can't access thie user data as it is deleted" })
// }

// const updateDetails0 = async (req, res) => {
//     let user0Details = await user0.findById(req.params.user0Id)
//     if (!user0Details) return res.send({ msg: "user does not exit in the db" })
//     let updateUser0 = await user0.findoneAndUpdate({ _id: req.params.user0Id }, req.body, { new: true });
//     res.send({ update: true, data: updatedUser0 })
// }

// const deleteUserData0 = async (req, res) => {
//     let user0Details = await user.dindById(req.params.user0Id)
//     if (!user0Details) return res.send({ msg: "user does not exists n the DB" })
//     let updateduser0 = await user0.findByIdAndDelete({ _id: req.params.user0Id }, { isDeleted: false }, { new: true });
//     res.send({ update: true, data: updatedUser0 })
// }

///   assignment/middleware 2 


// const createUser = async (req, res) => {
//     try {
//         let data = req.body
//         if (!await user.exists({ name: data.name })) {
//             let savedData = await user.create(data)
//             res.send({ msg: savedData })
//         }
//         else res.send({ msg: "this user is already exists" })
//     } catch (err) {
//         console.log(err.message);
//     }
// }


// const createProduct = async (req, res) => {
//     try {
//         let data = req.body
//         if (!await product.exists({ name: data.name })) {
//             let savedaData = await product.create(data)
//             res.send({ msg: savedData })
//         }
//         else res.send({ msg: "this product is already exists choose another!!" })
//     } catch (err) {
//         console.log(err.msg);
//     }
// }

// const createOrder = async (req, res) => {
//     let freeUser = req.isFreeAppUser
//     // check if userid and poductid is present in the body if yes check they are valid or objectid
//     if (!req.body.userId && !req.body.productId) return res.send({ msg: "userId and ProductId is required" })
//     if (!mongoose.isValidObjectId(req.body.userId)) return res.send({ msg: "the userId is invalid plz check" })
//     if (!mongoose.isValidObjectId(req.body.productId)) return res.send({ msg: "productId is invalid plz check" })
//     // checkong the userid and product id is from  user and product table or schema
//     let userbalance = await user.findById(req.body.userId).select('balance')//select is not require it is optional
//     if (!userbalance) return res.send({ msg: "userid is not match to usercollection" })
//     let productPrice = await product.findone({ _id: req.body.productId }).select('price') //select is not require it is optional
//     if (!productPrice) return res.send({ msg: "productid is not match to product collection" })
//     //checking assignment condition apply 3 logic which are given
//     if (!freeUser && userbalance.balance >= productPrice.price) {
//         let newBalance = userbalance.balance - productPrice.price
//         let orderData = await order.create({
//             userId: req.body.userId,
//             productId: req.body.productId,
//             amount: productPrice.price,
//             isFreeAppUser: false
//         })
//         await user.findOneAndUpdate({ _id: req.body.userId }, { balance: newBalance })
//         res.send({ msg: "orderData" })
//     }
//     if (!freeUser && userbalance.balance < productPrice.price) return res.send({ msg: "you have insufficient balance plz check and retry !!" })

//     if (freeUser) {
//         let orderData = await order.create({
//             userId: req.body.userId,
//             productId: req.body.productId,
//             amount: productPrice.price,
//             isFreeAppUser: true
//         })
//         res.send({ msg: "orderData" })

//     }
// }

// //module.exports = { createUser0, loginUser0, fetchUser0, updateDetails0, deleteUserData0} 
// module.exports = {createUser, createProduct, createOrder}

const {user,product,order} = require("../models/practiceModel")
const mongoose = require('mongoose');

const createUser = async (req, res) => {
    let data = req.body
    if(!await user.exists({name:data.name})){
    let savedData = await user.create(data)
    res.send({msg: savedData})
    }
    else res.send({msg: "This User already exists."})
}

const createProduct = async (req, res) => {
    let data = req.body
    if(!await product.exists({name:data.name})){
    let savedData = await product.create(data)
    res.send({msg: savedData})
    }
    else res.send({msg: "The product already exists."})
}

const createOrder = async (req, res) => {
    let freeUser = req.isFreeAppUser
    //checking if userId & productId is present in body and if yes check if they are valid ObjectIds----------> 
    if(!req.body.userId && !req.body.productId) return res.send({msg: "userId and productId is required."})
    if(!mongoose.isValidObjectId(req.body.userId)) return res.send({msg: "The UnserId is invalid."})
    if(!mongoose.isValidObjectId(req.body.productId)) return res.send({msg: "The ProductId is invalid."})
    //checking if the userId & productId are from user & product table os not--------->
    let userbalance = await user.findById(req.body.userId).select('balance')// this one I did by findById and 31 line I did using findOne
    if(!userbalance) return res.send({msg: "The userId doesn't belong to the user collection."})
    let productPrice = await product.findOne({_id: req.body.productId}).select('price') //select() is not needed actually, it's your choice
    if(!productPrice) return res.send({msg: "The productId doesn't belong to the product collection."})
    //checking assignment conditions and writing logic for all 3 scenarios------------>
    if(!freeUser && userbalance.balance >= productPrice.price){
        let newBalance = userbalance.balance - productPrice.price
        let orderData = await order.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: productPrice.price,
            isFreeAppUser: false
        })
        await user.findOneAndUpdate({_id: req.body.userId}, {balance: newBalance})
        res.send({msg: orderData})
    }
    if(!freeUser && userbalance.balance < productPrice.price) return res.send({msg: "insufficient balance. Recharge!!"})
    if(freeUser){
        let orderData = await order.create({
            userId: req.body.userId,
            productId: req.body.productId,
            amount: 0,
            isFreeAppUser: true
        })
        res.send({msg: orderData})
    }
}

module.exports = {createUser, createProduct, createOrder}