const Image = require('../models/Image')
const jwt = require('jsonwebtoken')
const path = require('path')

exports.uploadImages = async (req, res) => {
  try {
    const filepaths = req.files.map(file => file.path.replace(/\\/g, path.sep))
    const images = await Promise.all(filepaths.map(async (filepath) => {
      const image = new Image({
        path: `/${filepath.split(path.sep).slice(-1)[0]}`,
        ownerId: req.user._id
      })
      return await image.save()
    }))
    
    const baseUrl = process.env.baseUrl
    const imagesWithUrl = images.map(image => {
      const imageUrl = `${baseUrl}${image.path}`
      return { ...image.toJSON(), path: imageUrl }
    })
    
    res.status(200).send(imagesWithUrl)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to upload images.' })
  }
}

exports.getImages = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1

    const images = await Image.find({ owner: userId }).skip((page - 1) * limit).limit(limit)
    const totalImages = await Image.countDocuments({ owner: userId })
    const totalPages = Math.ceil(totalImages / limit)

    if (page > totalPages) {
      res.status(400).send({ error: `Invalid page number. Maximum page number is ${totalPages}.` })
    } else {
      // Add base URL to each image path
      const baseUrl = process.env.baseUrl;
      const imagesWithUrl = await Promise.all(images.map(async (image) => {
        const imageUrl = `${baseUrl}${image.path}`
        return {
          _id: image._id,
          ownerId: req.user._id,
          path: `${baseUrl}${image.path}`,
          __v: image.__v
        }
        
      }))
      
      res.status(200).json({
        images: imagesWithUrl,
        total: totalImages,
        totalPages: totalPages,
        currentPage: page
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to get images.' })
  }
}