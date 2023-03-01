const jwt = require('jsonwebtoken')
const User = require('../models/User')
require("dotenv").config()

//Authenticate Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
      if (!token) {
        return res.status(401).send('Unauthorized')
      }
    
      try {
        // Verify the token using the JWT library and the secret key used to sign the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Add the decoded token to the request object for use in subsequent middleware or routes
        req.user = decoded

        // Call next() to proceed to the next function
        next()
      } catch (error) {
        console.error(error)
        res.status(401).send('Unauthorized sorry') 
      }
    }

    module.exports = authenticateToken