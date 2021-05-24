const express = require('express')
const router = express.Router()

const controller = require('../controller/post')

router.get('/', controller.getIndex)
router.get('/create', controller.getCreate)
router.post('/create', controller.postCreate)
router.get('/:slug', controller.getPost)
router.post('/:slug/postcomment', controller.postComment)

module.exports = router
