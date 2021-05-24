const db = require('../model/db')
const Post = require('../model/postModel')

module.exports = {
  getIndex: async (req, res) => {
    let posts = await db.getDescending(Post, '', { 'title': { '$regex': req.query.search, '$options': 'i' } })
  
    posts.forEach((post) => {
      post.date = post.date.toDateString()
    })
  
    res.render('search', {
      title: 'Search Results',
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      posts: posts
    })
  },
  getResults: async (req, res) => {
    let result = await db.get(Post, 'slug title', { "title": { "$regex": req.query.content, "$options": "i" } })
  
    res.send(result)
  }
}