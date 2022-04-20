const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developerConroller")

//Developer-Batch route handlers
router.post("/batches", developerController.createBatch)
router.post("/developers", developerController.createDeveloper)
router.get("/scholarship-developers", developerController.scholarship_developers)
router.get("/developers", developerController.getDeveloper)

//router.post("/ObjectId_Checker", developerController.ObjectIdCheck)

module.exports = router;


