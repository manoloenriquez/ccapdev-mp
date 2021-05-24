const express = require('express')
const router = express.Router()

const db = require('../model/db')

const Post = require('../model/postModel')

router.get('/', async (req, res) => {
  let posts = await db.get(Post, '', { 'title': { '$regex': req.query.search, '$options': 'i' } })

  posts.forEach((post) => {
    post.date = post.date.toDateString()
  })

  res.render('search', {
    title: 'Search Results',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    posts: posts
  })
})

router.get('/check', async (req, res) => {
  let result = await db.get(Post, 'slug title', { "title": { "$regex": req.query.content, "$options": "i" } })

  res.send(result)
})

module.exports = router