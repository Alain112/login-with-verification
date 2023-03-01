const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'uploads'))
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    const filename = `${uuidv4()}.${ext}`
    cb(null, filename)
  }
})

// Only allow JPEG and PNG files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Only JPEG and PNG files are allowed'))
  }
}

//Limit the size of uploaded files to 5 MB
const limits = {
  fileSize: 5 * 1024 * 1024
}

const upload = multer({ storage, fileFilter, limits })

module.exports = upload