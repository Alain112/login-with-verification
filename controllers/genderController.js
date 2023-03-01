const Gender = require('../models/gender')

exports.createGender = async (req, res) => {
  try {  
    const { type } = req.body
    const ownerId = req.user._id
    const gender = new Gender({
      type: type,
      ownerId: ownerId
    })

    const savedGender = await gender.save()

    res.status(200).send(savedGender)
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to create gender.' })
  }
}

exports.getGenderById = async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber || 1
    const pageSize = req.query.pageSize || 10

    // Find the gender with the given ID and owner ID, using pagination options
    const gender = await Gender.paginate({ ownerId: req.user._id }, { page: pageNumber, limit: pageSize })
    res.status(200).send(gender)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to get gender.' })
  }
}