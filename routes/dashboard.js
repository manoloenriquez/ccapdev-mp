const express = require('express')
const router = express.Router()

const controller = require('../controller/dashboard')

router.get('/', controller.getIndex)
router.get('/editaccount', controller.getEditAccount)
router.get('/manageposts', controller.getManagePosts)
router.get('/editpost/:slug', controller.getEditPost)

module.exports = router