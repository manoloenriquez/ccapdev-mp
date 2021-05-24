const db = require('../model/db')
const User = require('../model/userModel')
const Post = require('../model/postModel')

module.exports = {
  getIndex: async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login')
      return
    }
  
    let data = await db.getById(User, '', req.session._id)
    let posts = await db.get(Post, '', { 'author.username':  req.session.username })
  
    res.render('dashboard/profile', {
      layout: 'dashboard',
      title: 'Dashboard',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      data: data,
      posts: posts,
      profile: true
    })
  },
  getEditAccount: async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login')
      return
    }
  
    let data = await db.getById(User, '', req.session._id)
  
    res.render('dashboard/editaccount', {
      layout: 'dashboard',
      title: 'Dashboard',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      data: data,
      edit: true
    })
  },
  getManagePosts: async (req, res) => {
    let posts = await db.get(Post, '', { 'author.username': req.session.username })
  
    posts.forEach((post) => {
      post.date = post.date.toLocaleDateString()
    })
  
    res.render('dashboard/manageposts', {
      layout: 'dashboard',
      title: 'Dashboard',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: posts,
      manage: true
    })
  },
  getEditPost: async (req, res) => {
    let post = await db.getOne(Post, '', { 'slug': req.params.slug })
  
    res.render('dashboard/editpost', {
      layout: 'dashboard',
      title: 'Edit Post',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      post: post
    })
  }
}