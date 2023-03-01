const Pet = require('../models/pet')
const jwt = require('jsonwebtoken')

exports.createPet = async (req, res) => {
  try {  
    const { name, species, age, ownerId } = req.body
    const pet = new Pet({
      name: name,
      species: species,
      age: age,
      ownerId: ownerId
    })

    const savedPet = await pet.save()

    res.status(200).send(savedPet)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to create pet.' })
  }
}

exports.getPetById = async (req, res) => {
  try {
    // Find the pet with the given ID and owner ID
    const pet = await Pet.findOne({ _id: req.params.id})
    res.status(200).send(pet)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to get pet.' })
  }
}

exports.updatePetById = async (req, res) => {
  try {
    // Find the pet with the given ID and owner ID
    const pet = await Pet.findOne({ _id: req.params.id })

    if (!pet) {
      return res.status(404).send({ error: 'Pet not found.' })
    }

    pet.name = req.body.name
    pet.species = req.body.species
    pet.age = req.body.age

    const updatedPet = await pet.save()

    res.status(200).send(updatedPet)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to update pet.' })
  }
}

exports.deletePetById = async (req, res) => {
  try {
    // Find the pet with the given ID and owner ID
    const pet = await Pet.findOne({ _id: req.params.id })
    await pet.remove()
    res.status(200).send({ message: 'Pet deleted successfully.' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete pet.' })
  }
}

exports.getMyPets = async (req, res) => {

  try {
    const token = req.headers.authorization.split(' ')[1]
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       const userId = decoded.id

    const limit = parseInt(req.query.limit) || 10
    const page = parseInt(req.query.page) || 1
  
    const pet = await Pet.find({ owner: userId })
    const totalPets = await Pet.countDocuments({ owner: userId })
    const totalPages = Math.ceil(totalPets / limit)
  
    if (page > totalPages) {
      res.status(400).send({ error: `Invalid page number. Maximum page number is ${totalPages}.` })
    } else {
      const startIndex = (page - 1) * limit
  
      const pets = await Pet.find({ owner: userId }).skip(startIndex).limit(limit)
  
      res.status(200).json({
        pets: pets,
        total: totalPets,
        totalPages: totalPages,
        currentPage: page
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to get pets.' })
  }
}