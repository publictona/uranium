const express = require('express')
const router = express.Router()
const CowinController = require('../controllers/cowinController')
const weatherController = require('../controllers/weatherController')
const memeController = require('../controllers/memeController')
router.get('/test-me', function (req, res) {
  res.send('My first ever api!')
})

module.exports = router
