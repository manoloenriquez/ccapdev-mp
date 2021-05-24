const express = require('express')
const router = express.Router()

const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')

router.get('/', async (req, res) => {
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
})

router.get('/editaccount', async (req, res) => {
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
})

router.get('/manageposts', async (req, res) => {
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
})

router.get('/editpost/:slug', async (req, res) => {
  let post = await db.getOne(Post, '', { 'slug': req.params.slug })

  res.render('dashboard/editpost', {
    layout: 'dashboard',
    title: 'Edit Post',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    post: post
  })
})


module.exports = router