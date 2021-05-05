const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const url = 'mongodb://127.0.0.1:27017/ccapdev-mp'

// Schemas
const userModel = require('./userModel')
const postModel = require('./postModel')
const commentModel = require('./commentModel')

const saltRounds = 10

module.exports = {
  connect: () => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
      if (err) throw err
      console.log(`Database connected to ${url}`)
    })
  },
  register: async (info, password) => {
    let user = await userModel.findOne({ 'username': info.username }, 'username')
    
    if (user != null) {
      return false
    }

    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   userModel.create({...info, password: hash}, err => {
    //     if (err) throw err
    //   })
    // })

    let hash = await bcrypt.hash(password, saltRounds)

    await userModel.create({ ...info, password: hash })

    return true
  },
  login: async (username, password) => {
    let user = await userModel.findOne({ 'username': username })
    let valid = await bcrypt.compare(password, user.password)

    return valid ? user : null
  },
  updateUser: async (id, newData) => {
    await userModel.updateOne({ _id: id }, {
      $set: { ...newData }
    })

    return true
  },
  delAccount: async (id) => {
    await userModel.findByIdAndDelete(id)
  },
  getUserData: async (id) => {
    let projection = 'fName lName email bio avatar'
    let data = await userModel.findById(id, projection).lean()

    return data
  },
  getAllPosts: async () => {
    let posts = await postModel.find({})

    return posts
  },
  getPost: async (slug) => {
    let post = await postModel.findOne({ 'slug': slug })

    return post
  },
  createPost: async (post) => {
    let tempPost = postModel.findOne({ 'slug': post.slug })

    if (tempPost != null) {
      return false
    }

    await postModel.create(post)

    return true
  },
  modifyPost: async (post) => {

  },
  delete: async (model, id) => {
    await model.findByIdAndDelete(id)
  },
  getComments: async (postSlug) => {
    let comments = await commentModel.find({ 'postSlug': postSlug })

    return comments
  }
}