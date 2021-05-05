const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  auhorID: {
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

module.exports = mongoose.model('Post', postSchema)