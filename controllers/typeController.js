const Type = require('../models/type')
const jwt = require('jsonwebtoken')
bodyParser = require('body-parser')

exports.createType = async (req, res) => {
  try {  
    const { name, value, ownerId } = req.body
    const type = new Type({
      name: name,
      value: value,
      ownerId: req.user._id
    })

    const savedType = await type.save()

    res.status(200).send(savedType)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to create type.' })
  }
}

exports.getTypes = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const userId = decoded.id

    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
    
  
    const type = await Type.find({ owner: userId })
    const totalTypes = await Type.countDocuments({ owner: userId })
    const totalPages = Math.ceil(totalTypes / limit)
  
    if (page > totalPages) {
      res.status(400).send({ error: `Invalid page number. Maximum page number is ${totalPages}.` })
    } else {
      const startIndex = (page - 1) * limit
  
      const types = await Type.find({ owner: userId }).skip(startIndex).limit(limit)
  
      res.status(200).json({
        types: types,
        total: totalTypes,
        totalPages: totalPages,
        currentPage: page
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to get types.' })
  }
}