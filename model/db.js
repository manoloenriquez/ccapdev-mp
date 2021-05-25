const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.DB_URL

module.exports = {
  connect: () => {
    mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) throw err
      console.log(`Database connected to ${url}`)
    })
  },
  get: async (model, projection, key) => {
    try {
      return await model.find(key, projection).lean()
    } catch (err) {
      return null
    }
  },
  getOne: async (model, projection, key) => {
    try {
      return await model.findOne(key, projection).lean()
    } catch (err) {
      return null
    }
  },
  getById: async (model, projection, id) => {
    try {
      return await model.findById(id, projection).lean()
    } catch (err) {
      return null
    }
  },
  getLastResults: async (model, projection, key, num) => {
    try {
      return await model.find(key, projection).sort('-date').limit(num).lean()
    } catch (err) {
      return null
    }
  },
  getDescending: async (model, projection, key) => {
    try {
      return await model.find(key, projection).sort('-date').lean()
    } catch (err) {
      return null
    }
  },
  deleteById: async (model, id) => {
    try {
      return await model.findByIdAndDelete(id)
    } catch (err) {
      return null
    }
  },
  create: async (model, data) => {
    try {
      return await model.create(data)
    } catch (err) {
      return null
    }
  },
  update: async (model, key, data) => {
    try {
      return await model.updateOne(key, { $set: { ...data } })
    } catch (err) {
      return null
    }
  },
  updateMany: async (model, key, data) => {
    try {
      return await model.updateMany(key, { $set: { ...data } })
    } catch (err) {
      return null
    }
  },
  deleteOne: async (model, key) => {
    try {
      return await model.deleteOne(key)
    } catch (err) {
      return null
    }
  },
  delete: async (model, key) => {
    try {
      return await model.deleteMany(key)
    } catch (err) {
      return null
    }
  }
}