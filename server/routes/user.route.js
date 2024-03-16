const express = require('express');
const userController = require('../controllers/user.controllers'); // Replace with your controller path

const router = express.Router();

// User registration route (assuming POST /api/users/register)
router.post('/register', userController.register);
router.get('/getuser',userController.getuserdata);
// DELETE user by ID route (e.g., DELETE /api/users/:id)
router.delete('/users/:userid', userController.deleteUser);
// Other user-related routes (e.g., GET /api/users/:userId, update profile)
// ...

module.exports = router;
