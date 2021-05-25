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
    if (req.query.username.includes(' ')) {
      res.send(false)
      return
    }
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
    let result = await db.update(User, { _id: req.session._id }, req.body)

    if (req.body.username){
      await db.updateMany(Post, { 'author': req.session.username }, { author: req.body.username })
      req.session.username = req.body.username
    }
  
    res.send(result)
  },
  updatePassword: async (req, res) => {
    const saltRounds = 10
    let hash = await bcrypt.hash(req.body.password, saltRounds)
  
    let result = await db.update(User, { _id: req.session._id }, { password: hash })
  
    res.send(result)
  },
  updatePost: async (req, res) => {
    let result = await db.update(Post, { 'slug': req.body.slug }, req.body.data)
  
    res.send(result)
  },
  updateComment: async (req, res) => {
    let result = await db.update(Comment, { _id: req.body.id }, req.body.data)
  
    res.send(result)
  },
  deleteAccount: async (req, res) => {
    let result = await db.deleteById(User, req.session._id)
  
    req.session.destroy(err => {
      if (err) throw err
    })
  
    res.send(result)
  },
  deletePost: async (req, res) => {
    let result = await db.deleteOne(Post, { 'slug': req.body.slug })

    if (result) await db.delete(Comment, { 'postslug': req.body.slug })
  
    res.send(result)
  },
  deleteComment: async (req, res) => {
    let result = await db.deleteById(Comment, req.body.id)
  
    res.send(result)
  }
}