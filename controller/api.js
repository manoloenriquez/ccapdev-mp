const bcrypt = require('bcrypt')
const db = require('../model/db')
const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

module.exports = {
  getAvatar: async (req, res) => {
    let data = await db.getById(User, 'avatar', req.session._id)
  
    res.send(data.avatar)
  },
  checkEmail: async (req, res) => {
    let data = await db.getOne(User, 'email', { 'email': req.query.email })
    let valid = data == null
  
    res.send(valid)
  },
  checkUsername: async (req, res) => {
    let data = await db.getOne(User, 'username', { 'username': req.query.username })
    let valid = data == null
  
    res.send(valid)
  },
  checkPassword: async (req, res) => {
    let { password } = await db.getById(User, 'password', req.session._id)
    let result = await bcrypt.compare(req.query.password, password)
  
    res.send(result)
  },
  checkSlug: async (req, res) => {
    let posts = await db.get(Post, 'slug', { 'slug': req.query.slug })
  
    res.send(`${posts.length}`)
  },
  updateAccount: async (req, res) => {
    await db.update(User, { _id: req.session._id }, req.body)
  
    res.send(true)
  },
  updatePassword: async (req, res) => {
    const saltRounds = 10
    let hash = await bcrypt.hash(req.body.password, saltRounds)
  
    await db.update(User, { _id: req.session._id }, { password: hash })
  
    res.send(true)
  },
  updatePost: async (req, res) => {
    await db.update(Post, { 'slug': req.body.slug }, req.body.data)
  
    res.send(true)
  },
  updateComment: async (req, res) => {
    await db.update(Comment, { _id: req.body.id }, req.body.data)
  
    res.send(true)
  },
  deleteAccount: async (req, res) => {
    await db.deleteById(User, req.session._id)
  
    req.session.destroy(err => {
      if (err) throw err
    })
  
    res.send(true)
  },
  deletePost: async (req, res) => {
    await db.deleteOne(Post, { 'slug': req.body.slug })
    await db.delete(Comment, { 'postslug': req.body.slug })
  
    res.send(true)
  },
  deleteComment: async (req, res) => {
    await db.deleteById(Comment, req.body.id)
  
    res.send(true)
  }
}