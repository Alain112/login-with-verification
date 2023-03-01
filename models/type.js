const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

typeSchema.statics.getTypesByPage = async function(limit, page) {
    const types = await this.find().skip(page).limit(limit)
    const totalTypes = await this.countDocuments()
    const totalPages = Math.ceil(totalTypes / limit)
    return { types, totalTypes, totalPages }
  }

const Type = mongoose.model('Type', typeSchema)

module.exports = Type


