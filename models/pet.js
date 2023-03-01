const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

petSchema.statics.getPetsByPage = async function(limit, offset) {
  const pets = await this.find().skip(offset).limit(limit)
  const totalPets = await this.countDocuments()
  const totalPages = Math.ceil(totalPets / limit)
  return { pets, totalPets, totalPages }
}

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet