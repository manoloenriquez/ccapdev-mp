const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

module.exports = {
  getIndex: async (req, res, next) => {
    let posts =  await db.getDescending(Post, '', {})
  
    posts.forEach((post) => {
      post.date = post.date.toDateString()
    })
  
    res.render('allpost', {
      title: 'All Posts',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: posts
    })
  },
  getCreate: (req, res) => {
    res.render('posts/create', {
      title: 'Create Post',
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  },
  postCreate: async (req, res) => {
    let { fName, lName } = await db.getById(User, 'fName lName', req.session._id)
    console.log(req.body)
    let data = { 
      ...req.body,
      author: {
        username: req.session.username,
        name: `${fName} ${lName}`
      } 
    }
  
    let post = await db.create(Post, data)
    res.send(post)
  },
  getPost: async (req, res) => {
    let post = await db.getOne(Post, '', { slug: req.params.slug })
    let comments = await db.get(Comment, '', { postslug: req.params.slug })
  
    if (post == null) {
      res.render('error', {
        title: 'Post not found',
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        message: 'Post not found'
      })
      return
    }
  
    post.date = post.date.toDateString()
  
    comments.forEach((comment) => {
      comment.date = comment.date.toDateString()
      comment.isOwn = comment.username == req.session.username
    })
  
    res.render('posts/post', {
      title: post.title,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      data: post,
      comments: comments
    })
  },
  postComment: async (req, res) => {
    let avatar = await db.getOne(User, 'avatar', { username: req.session.username })
    let data = {
      username: req.session.username,
      postslug: req.params.slug,
      content: req.body.content,
      date: new Date(Date.now()),
      avatar: avatar.avatar
    }
  
    let result = await db.create(Comment, data) 
    res.send(result)
  }
}