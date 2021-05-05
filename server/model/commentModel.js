const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  postID: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Comment', commentSchema)