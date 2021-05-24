const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  postslug: {
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
  avatar: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Comment', commentSchema)