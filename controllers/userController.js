const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { sendSMS } = require('../utils/sms')
require("dotenv").config()

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      password: hashedPassword
    })
    const savedUser = await user.save()
    
    // Generate a verification code and store it in the database
    const verificationCode = Math.floor(Math.random() * 1000000)
    savedUser.verificationCode = verificationCode
    await savedUser.save()

    // Send verification code via SMS
    const from = "NASA"
    const to = phone
    const text = `Hello. Your verification code is ${verificationCode}`
    
    await sendSMS(to, from, text)
    
    res.status(200).send({ message: 'Registration successful. Please check your phone for the verification code.'})
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Registration failed.' })
  }
}

// Resend verification code
exports.resendVerificationCode = async (req, res) => {
  try {
    const { phone } = req.body

    // Find user by phone number
    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(404).send({ error: 'User not found.' })
    }

    // Generate a new verification code and store it in the database
    const verificationCode = Math.floor(Math.random() * 1000000)
    user.verificationCode = verificationCode
    await user.save()

    // Send verification code via SMS
    const from = "NASA"
    const to = user.phone
    const text = `Hello. Your new verification code is ${verificationCode}`
    await sendSMS(to, from, text)

    res.status(200).send({ message: 'New verification code sent successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to resend verification code.' })
  }
}

// Verify a user's phone number
exports.verifyUser = async (req, res) => {
  try {
    const { verificationCode } = req.body
    const user = await User.findOne({ verificationCode })

    if (!user) {
      return res.status(401).send({ error: 'Verification failed. Invalid verification code.' })
    }

    user.verified = true
    await user.save()

    // Generate a JWT access token and return it to the client
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
    res.status(200).send({ token: token })
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Verification failed.' })
  }
}

// Login an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user || !user.verified) {
      res.status(401).send({ error: 'Authentication failed. Invalid email or password.' })
      return
    }
  
    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (passwordMatch) {

      // Generate a JWT access token and return it to the client
      const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET)
      res.status(200).send({ token: token })
    } else {
      res.status(401).send({ error: 'Authentication failed. Invalid email or password.' })
    }
  
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Authentication failed.' })
  }
}