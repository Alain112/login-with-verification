const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')
const authenticateToken = require('../middleware/authenticateToken')
const upload = require('../middleware/multer')

router.post('/upload', authenticateToken, upload.array('images', 10), imageController.uploadImages)
router.get('/', authenticateToken, imageController.getImages)

module.exports = router