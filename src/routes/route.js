const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")
const orderController = require("../controllers/orderController")
const {headerCheck} = require("../middleware/middleware")




module.exports = router;




