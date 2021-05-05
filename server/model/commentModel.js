const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  id: String,
  posterID: String,
  postID: String,
  content: String,
  date: Date
})

module.exports = mongoose.model('Comment', commentSchema)