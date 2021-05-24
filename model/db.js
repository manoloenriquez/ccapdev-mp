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
    return await model.find(key, projection).lean()
  },
  getOne: async (model, projection, key) => {
    return await model.findOne(key, projection).lean()
  },
  getById: async (model, projection, id) => {
    return await model.findById(id, projection).lean()
  },
  getLastResults: async (model, projection, key, num) => {
    return await model.find(key, projection).sort('-date').limit(num).lean()
  },
  getDescending: async (model, projection, key) => {
    return await model.find(key, projection).sort('-date').lean()
  },
  deleteById: async (model, id) => {
    await model.findByIdAndDelete(id)
  },
  create: async (model, data) => {
    return await model.create(data)
  },
  update: async (model, key, data) => {
    await model.updateOne(key, { $set: { ...data } })
  },
  deleteOne: async (model, key) => {
    await model.deleteOne(key)
  },
  delete: async (model, key) => {
    await model.deleteMany(key)
  }
}