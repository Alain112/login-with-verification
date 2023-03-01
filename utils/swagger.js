const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      description: 'Tekram Mr. Jihad',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.baseUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format `Bearer {token}`',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec