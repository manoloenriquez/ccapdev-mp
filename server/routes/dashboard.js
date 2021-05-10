const express = require('express')
const router = express.Router()

const db = require('../model/db')

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login')
    return
  }

  // res.render('', {
  //   layout: 'dashboard'
  // })
  res.redirect('/dashboard/editaccount')
})

router.get('/editaccount', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login')
    return
  }

  let data = await db.getUserData(req.session._id)

  console.log(data)

  res.render('dashboard/editaccount', {
    layout: 'dashboard',
    title: 'Dashboard',
    loggedIn: req.session.loggedIn,
    username: req.session.username,
    data: data
  })
})

router.post('/editaccount', (req, res) => {
  db.updateUser(req.session._id, req.body)
})

router.post('/deleteaccount', (req, res) => {
  db.delAccount(req.session._id)

  req.session.destroy(err => {
    if (err) throw err
  })
})

module.exports = router