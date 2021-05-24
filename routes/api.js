const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

router.get('/getavatar', async (req, res) => {
  let data = await db.getById(User, 'avatar', req.session._id)

  res.send(data.avatar)
})

router.get('/checkemail', async (req, res) => {
  let data = await db.getOne(User, 'email', { 'email': req.query.email })
  let valid = data == null

  res.send(valid)
})

router.get('/checkusername', async (req, res) => {
  let data = await db.getOne(User, 'username', { 'username': req.query.username })
  let valid = data == null

  res.send(valid)
})

router.get('/checkpassword', async (req, res) => {
  let { password } = await db.getById(User, 'password', req.session._id)
  let result = await bcrypt.compare(req.query.password, password)

  res.send(result)
})

router.get('/checkslug', async (req, res) => {
  let posts = await db.get(Post, 'slug', { 'slug': req.query.slug })

  res.send(`${posts.length}`)
})

router.put('/updateaccount', async (req, res) => {
  await db.update(User, { _id: req.session._id }, req.body)

  res.send(true)
})

router.put('/updatepassword', async (req, res) => {
  const saltRounds = 10
  let hash = await bcrypt.hash(req.body.password, saltRounds)

  await db.update(User, { _id: req.session._id }, { password: hash })

  res.send(true)
})

router.put('/updatecomment', async (req, res) => {
  await db.update(Comment, { _id: req.body.id }, req.body.data)

  res.send(true)
})

router.delete('/deleteaccount', async (req, res) => {
  await db.deleteById(User, req.session._id)

  req.session.destroy(err => {
    if (err) throw err
  })

  res.send(true)
})

router.delete('/deletepost', async (req, res) => {
  await db.deleteOne(Post, { 'slug': req.body.slug })
  await db.delete(Comment, { 'postslug': req.body.slug })
})

router.delete('/deletecomment', async (req, res) => {
  await db.deleteById(Comment, req.body.id)

  res.send(true)
})

module.exports = router