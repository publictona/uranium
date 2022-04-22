const express = require('express');
const router = express.Router();
const controller = require("../controllers/authController")
const {authCheck} = require("../middleware/middleware")

//Developer-Batch route handlers
router.post("/users", controller.createUser)
router.post("/login", controller.loginUser)
router.get("/users/:userId", authCheck ,controller.fetchUser)
router.put("/users/:userId",authCheck, controller.updateDetails)
router.delete("/users/:userId",authCheck, controller.deleteUserData)

module.exports = router;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYzMzBkNzA0ZmVjZDYxMWYzODI4OTciLCJpYXQiOjE2NTA2Njc4NTF9.l40LHLqP7e3aqr_OV3yotKyIeXq2LMonYOcme13niSQ

