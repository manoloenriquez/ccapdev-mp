const express = require('express')
const router = express.Router()

const controller = require('../controller/search')

router.get('/', controller.getIndex)
router.get('/check', controller.getResults)

module.exports = router