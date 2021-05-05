const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  slug: String,
  title: String,
  content: String,
  auhorID: String,
  date: Date,
  votes: Number
})

module.exports = mongoose.model('Post', postSchema)