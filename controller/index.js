const bcrypt = require('bcrypt')
const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')

module.exports = {
  getIndex: async (req, res) => {
    let posts = await db.getLastResults(Post, 'slug title author date', {}, 3)

    posts.forEach((post) => {
      post.date = post.date.toDateString()
    })

    res.render('index', { 
      title: 'TechToday',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: posts
    })
  },
  getAbout: (req, res) => {
    res.render('about', {
      title: 'About',
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  },
  getRegister: (req, res) => {
    res.render('register', { 
      layout: 'form',
      title: 'Sign up',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    })
  },
  postRegister: async (req, res) => {
    const saltRounds = 10
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
  },
  getEnterInfo: async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/register')
      return
    }
  
    let data = await db.getById(User, '', req.session._id)
  
    res.render('userinfo', {
      layout: 'form',
      title: 'Enter info',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      data: data
    })
  },
  postEnterInfo: async (req, res) => {
    await db.update(User, { _id: req.session._id }, req.body)

    res.redirect('/dashboard')
  },
  getLogin: (req, res) => {
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
  },
  postLogin: async (req, res) => {
    let data = await db.getOne(User, '_id username password', { 'username': req.body.username })
    let valid = await bcrypt.compare(req.body.password, data.password)

    if (!valid) {
      res.render('error', {
        title: 'Invalid credentials',
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        message: 'Invalid credentials'
      })
      return
    }

    req.session.loggedIn = true
    req.session._id = data._id.toString()
    req.session.username = req.body.username
    res.redirect('/')
  },
  getLogout: (req, res) => {
    req.session.destroy(err => {
      if (err) throw err
    })
  
    console.log('Logged out')
    res.redirect('/')
  }
}