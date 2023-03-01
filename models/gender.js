const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const genderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

// Apply pagination plugin to the schema
genderSchema.plugin(mongoosePaginate)

const Gender = mongoose.model('Gender', genderSchema)

module.exports = Gender
