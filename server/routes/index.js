const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')

const saltRounds = 10

router.get('/test', (req, res) => {
  res.send(req.query.content)
})

router.get('/', async (req, res, next) => {
  let posts = await db.get(Post, 'slug title subtitle author date', {})

  posts.forEach((post) => {
    post.date = post.date.toDateString()
  })

  res.render('index', { 
    title: 'Express',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    posts: posts
  })
})

router.get('/register', (req, res, next) => {
  res.render('register', { 
    layout: 'form',
    title: 'Sign up',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  })
})

router.post('/register', async (req, res, next) => {
  let user = {
    username: req.body.username,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email
  }

  let password = req.body.password
  user.password = await bcrypt.hash(password, saltRounds)
  let data = await db.create(User, user)

  req.session.loggedIn = true
  req.session._id = data._id.toString()
  req.session.username = req.body.username

  res.redirect('/enterinfo')
})

router.get('/enterinfo', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/register')
    return
  }

  let data = await db.getUserData(req.session._id)

  res.render('userinfo', {
    layout: 'form',
    title: 'Enter info',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    data: data
  })
})

router.post('/enterinfo', (req, res) => {
  db.updateUser(req.session._id, req.body)
  console.log(req.body)
  res.redirect('/dashboard')
})

router.get('/login', (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }

  res.render('login', {
    layout: 'form',
    title: 'Log in',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  })
})

router.post('/login', async (req, res) => {
    // let data = await db.login(req.body.username, req.body.password)
    let data = await db.getOne(User, '_id username password', { 'username': req.body.username })
    let valid = await bcrypt.compare(req.body.password, data.password)

    // if (data == null) {
    //   res.sendStatus(401)
    //   return
    // }

    if (!valid) {
      res.sendStatus(401)
      return
    }

    req.session.loggedIn = true
    req.session._id = data._id.toString()
    req.session.username = req.body.username
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
  })

  console.log('Logged out')
  res.redirect('/')
})

router.get('/getavatar', async (req, res) => {
  let data = await db.getById(User, 'avatar', req.session._id)

  res.send(data.avatar)
})

module.exports = router