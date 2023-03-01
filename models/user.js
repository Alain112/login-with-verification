const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  verificationCode: { type: String },
  verified: { type: Boolean, default: false }
})

userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User