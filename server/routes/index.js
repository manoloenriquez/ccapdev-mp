const express = require('express')
const router = express.Router()

const db = require('../model/db')

router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    posts: [
      {
        link: '#',
        title: 'Test',
        subtitle: 'Test subtitle',
        author: {
          link: '#',
          name: 'Manolo Enriquez'
        },
        postedOn: new Date(Date.now()).toDateString()
      }
    ]
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

router.post('/register', (req, res, next) => {
  const user = {
    username: req.body.username,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email
  }

  const password = req.body.password

  db.register(user, password)

  res.redirect('/login')
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
    let data = await db.login(req.body.username, req.body.password)

    if (data == null) {
      res.sendStatus(401)
      return
    }

    // res.locals._id = data._id.toString()
    // res.locals.username = req.body.username
    // next()
    console.log(res.locals)
    req.session.loggedIn = true
    req.session._id = data._id.toString()
    req.session.username = req.body.username
    res.redirect('/')
    
  }, 
  // (req, res) => {
  //   console.log(res.locals)
  //   req.session.loggedIn = true
  //   req.session._id = res.locals._id
  //   req.session.username = res.locals.username
  //   res.redirect('/')
  // }
)

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
  })

  console.log('Logged out')
  res.redirect('/')
})


module.exports = router
