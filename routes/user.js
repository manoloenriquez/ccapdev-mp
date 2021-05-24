const express = require('express')
const router = express.Router()

const controller = require('../controller/user')

router.get('/', controller.getIndex)
router.get('/:username', controller.getUser)

module.exports = router
