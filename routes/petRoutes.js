const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const petController = require('../controllers/petController')

router.get('/al',authenticateToken, petController.getMyPets)
router.post('/', authenticateToken, petController.createPet)
router.get('/:id', authenticateToken, petController.getPetById)
router.put('/:id', authenticateToken, petController.updatePetById)
router.delete('/:id', authenticateToken, petController.deletePetById)

module.exports = router