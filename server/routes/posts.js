const express = require('express')
const router = express.Router()

const db = require('../model/db')

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.get('/:slug', (req, res) => {
  let post = db.getPost(req.params.slug)

  res.render('post', {
    title: 'Express',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    headerimg: post.headerimg,
    author: {

    }
  })
})

module.exports = router
