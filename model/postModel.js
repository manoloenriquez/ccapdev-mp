const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    // type: String,
    username: { type: String },
    name: { type: String }
  },
  date: {
    type: Date,
    required: true
  },
  headerimg: {
    type: String,
  }
})

module.exports = mongoose.model('Post', postSchema)