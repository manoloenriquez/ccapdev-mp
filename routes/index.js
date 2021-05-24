const express = require('express')
const router = express.Router()

const controller = require('../controller/index')

router.get('/', controller.getIndex)
router.get('/about', controller.getAbout)
router.get('/register', controller.getRegister)
router.post('/register', controller.postRegister)
router.get('/enterinfo', controller.getEnterInfo)
router.post('/enterinfo', controller.postEnterInfo)
router.get('/login', controller.getLogin)
router.post('/login', controller.postLogin)
router.get('/logout', controller.getLogout)

module.exports = router