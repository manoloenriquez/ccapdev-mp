const express = require('express')
const router = express.Router()

const db = require('../model/db')

const Post = require('../model/postModel')

router.get('/check', async (req, res) => {

  let result = await db.get(Post, 'slug title', { "title": { "$regex": req.query.content, "$options": "i" } })

  res.send(result)
})

module.exports = router