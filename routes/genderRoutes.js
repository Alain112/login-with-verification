const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const genderController = require('../controllers/genderController')

router.post('/', authenticateToken, genderController.createGender)
router.get('/all', authenticateToken, genderController.getGenderById)

module.exports = router