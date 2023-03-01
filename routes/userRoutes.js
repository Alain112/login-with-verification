const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')  

// Register a new user
router.post('/register', userController.registerUser)

// Resend verification code
router.post('/resend-verification-code', userController.resendVerificationCode)

// Verify a user's phone number
router.post('/verify', userController.verifyUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Invalid request data
 */

// Login an existing user
router.post('/login', userController.loginUser)

module.exports = router