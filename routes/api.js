const express = require('express')
const router = express.Router()

const controller = require('../controller/api')

router.get('/getavatar', controller.getAvatar)
router.get('/checkemail', controller.checkEmail)
router.get('/checkusername', controller.checkUsername)
router.get('/checkpassword', controller.checkPassword)
router.get('/checkslug', controller.checkSlug)
router.put('/updateaccount', controller.updateAccount)
router.put('/updatepassword', controller.updatePassword)
router.put('/updatecomment', controller.updateComment)
router.delete('/deleteaccount', controller.deleteAccount)
router.delete('/deletepost', controller.deletePost)
router.delete('/deletecomment', controller.deleteComment)

module.exports = router