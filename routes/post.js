const express = require('express')
const router = express.Router()

const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

router.get('/', async (req, res, next) => {
  // res.send('respond with a resource')

  let data = {
    slug: 'i-believe-every-human-has-a-finite-number-of-heartbeats-i-dont-intend-to-waste-any-of-mine',
    title: `I believe every human has a finite number of heartbeats. I don't intend to waste any of mine`,
    content: `Did you know that the human heart beats around 2 billion times in the coutse of a lifetime, well as the title of this article suggests, I don't intend to waste any of mine. There's a lot to do, and dreams  to accomplish, and I don't want to waste any time not doing anything to achieve these dreams of mine. I hope  this article will get you to reflect on the things you want to achieve and the things you want to do,  and I hope you will life your life to the fullest, lest you regret anything.`,
    author: {
      username: 'manolo_enriquez',
      name: 'Manolo Enriquez'
    },
    date: 'August 17, 2020',
    headerimg: '/images/heartbeat.jfif'
  }

  await db.create(Post, data)
})

router.get('/create', (req, res) => {
  res.render('posts/create', {
    title: 'Create Post',
    loggedIn: req.session.loggedIn,
    username: req.session.username
  })
})

router.post('/create', async (req, res) => {
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
})

router.get('/:slug', async (req, res) => {
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
})

router.post('/:slug/postcomment', async (req, res) => {
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
})

module.exports = router
