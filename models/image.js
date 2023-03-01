const mongoose = require('mongoose')
const path = require('path')

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})
 
// Create a path to the 'uploads' subfolder in the 'public' folder for storing uploaded files
const uploadPath = path.join(__dirname, '../public/uploads')

imageSchema.statics.getImagesByPage = async function(limit, page) {
  const images = await this.find().skip(page).limit(limit)
  const totalImages = await this.countDocuments()
  const totalPages = Math.ceil(totalImages / limit)
  return { images, totalImages, totalPages }
}

const Image = mongoose.model('Image', imageSchema)

module.exports = Image