const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  bio: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    default: '/images/avatar.png'
  }
})

module.exports = mongoose.model('User', userSchema)