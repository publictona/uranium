const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developerController")
const upoController = require/("../controllers/upoController")

//Developer-Batch route handlers
router.post("/batches", developerController.createBatch)
router.post("/developers", developerController.createDeveloper)
router.get("/scholarship-developers", developerController.scholarship_developers)
router.get("/scholarship-developer", developerController.getDeveloper)

//User,Product,Order route handlers
router.post("/createProduct", upoController.createProduct)
//router.post("/createUser", upoController.createUser)

module.exports = router;


