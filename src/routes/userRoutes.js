const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middleware/validateUser');
const { auth } = require('../middleware/auth');

router.get('/', auth, userController.getUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', validateUser, userController.createUser);

module.exports = router;