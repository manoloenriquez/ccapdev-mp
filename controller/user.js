const db = require('../model/db')
const User = require('../model/userModel')
const Post = require('../model/postModel')

module.exports = {
  getIndex: (req, res) => {
    res.redirect('/')
  },
  getUser: async (req, res) => {
    let data = await db.getOne(User, '', { 'username': req.params.username })
    let posts = await db.get(Post, '', { 'author.username': req.params.username })
  
    if (data == null) {
      res.render('error', {
        title: 'User not found',
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        message: `${req.params.username} no longer exists`
      })
      return
    }
  
    res.render('users/profile', {
      title: data.username,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      data: data,
      posts: posts
    })
  }
}