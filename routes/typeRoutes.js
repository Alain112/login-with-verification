const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken')
const typeController = require('../controllers/typeController')

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /types/create:
 *   post:
 *     summary: Create a new type
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 *       '500':
 *         description: Internal server error
 */

router.post('/create', authenticateToken, typeController.createType)

/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get all types
 *     description: Get all types
 *     tags:
 *       - Types
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of type objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */

router.get('/', authenticateToken, typeController.getTypes)

module.exports = router