const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register
router.post('/users', authController.registerController);

// Login
router.post('/session', authController.loginController);

router.get('/session', authController.refreshTokenController);


module.exports = router;
