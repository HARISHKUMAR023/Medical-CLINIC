// app.routes.js
const express = require('express');
const router = express.Router();
const roleControllers = require('../controllers/role.controllers');


// Role routes
router.post('/roles', roleControllers.createRole);
router.get('/roles', roleControllers.getRoles);



module.exports = router;
