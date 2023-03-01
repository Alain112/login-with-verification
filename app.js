const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const { connectDB } = require('./utils/database')
const userRoutes = require('./routes/userRoutes')
const petRoutes = require('./routes/petRoutes')
const imageRoutes = require('./routes/imageRoutes')
const typeRoutes = require('./routes/typeRoutes')
const genderRoutes = require('./routes/genderRoutes')
const swaggerSpec = require('./utils/swagger')

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static('public/uploads'))

// Database connection
connectDB()

// Routes
app.use('/users', userRoutes)
app.use('/pets', petRoutes)
app.use('/image', imageRoutes) 
app.use('/types', typeRoutes)
app.use('/genders', genderRoutes)

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app

app.listen(3000, () => {
  console.log('Server listening on port 3000.')
  })