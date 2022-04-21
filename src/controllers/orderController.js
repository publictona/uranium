const {user,product,order} = require("../models/schemas")
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

// Write a POST api for order purchase that takes a userId and a productId in request body. 
//If the header isFreeAppUser is not present terminate the request response cycle with an error message
// that the request is missing a mandatory header If the header is present the control goes to the 
//request handler. Perform the user and product validation. Check if the user exists as well as whether 
//the product exists. Return an error with a suitable error message if either of these validations fail 
//For every purchase we save an order document in the orders collection. isFreeAppUser property in an Order
// document depends on the header isFreeAppUser. If the isFreeAppUser header is true then the balance of
// the user is not deducted and the amount in order is set to 0 as well the attribute in order isFreeAppUser 
//is set to true. If this header has a false value then the product’s price is checked. This value is 
//deducted from the user’s balance and the order amount is set to the product’s price as well as the 
//attrbiute isFreeAppUser is set to false in order document.
// Update the logic in middleware to set the isFreeAppUser attribute in req. Use this attribute 
//in the route handler for setting the isFreeAppUser attributes of User and Order collection.
