const express = require('express');
const router = express.Router();

// Import controller functions
//const { register, login, getAllUsers } = require('../controllers/authController');
const { register, login, getAllUsers, getUserById } = require('../controllers/authController');
const { updateUser } = require('../controllers/authController');
const { deleteUser } = require('../controllers/authController');
// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get all users route
router.get('/users', getAllUsers);
//Get single user by id
router.get('/users/:id', getUserById);
//Update user by id
router.put('/users/:id', updateUser);
//Delete user by id
router.delete('/users/:id', deleteUser);
module.exports = router;
