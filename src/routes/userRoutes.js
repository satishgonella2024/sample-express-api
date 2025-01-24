/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - password
*       properties:
*         name:
*           type: string
*         email:
*           type: string
*           format: email
*         password:
*           type: string
*         active:
*           type: boolean
*           default: true
*/

/**
* @swagger
* /api/users:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get all users
*     responses:
*       200:
*         description: List of users
*   post:
*     summary: Create a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: User created
* 
* /api/users/{id}:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get user by ID
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*/

const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validateUser');
const { auth } = require('../middleware/auth');

router.get('/', auth, userController.getUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', validateUser, userController.createUser);

module.exports = router;