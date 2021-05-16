const express = require('express')
const router = express.Router()

const db = require('../model/db')

const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

router.get('/', async (req, res, next) => {
  // res.send('respond with a resource')

  let data = {
    slug: 'my-struggles-with-web-development',
    title: 'My Struggles with Web Development',
    content: `I recently just started learning about web development, and I find it to be an interesting topic. The idea of being able to create a website and make it look exactly how I want it to look keeps me motivated to learn  more about it despite not knowing anything about it prior to starting the learning process. The idea is simple enough.  Write some HTML, then change how it looks using CSS, but once I started making some webpages on my own, I was overwhelmed  with a lot of other things I don't know about. I struggled with this, until I found a learning resource called W3Shcools. After studying it for some time, I was finally able to understand the things I don't know about web development, particularly  CSS, since W3Shcools had an in-depth explanation for every property I can edit to make a website look the way I want it to.  Though I still have much to learn, I feel more motivated to learn more about web development now that I was able to get through the hardest part of learning, which is taking the first steps into the unknown.`,
    author: {
      username: 'NONAME',
      name: 'Gabriel Chavez'
    },
    date: 'March 30, 2021',
    headerimg: '/images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg'
  }

  await db.create(Post, data)
})

router.get('/:slug', async (req, res) => {
  let post = await db.getOne(Post, '', { slug: req.params.slug })
  let comments = await db.get(Comment, '', { postslug: req.params.slug })

  post.date = post.date.toDateString()

  comments.forEach((comment) => {
    comment.date = comment.date.toDateString()
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
