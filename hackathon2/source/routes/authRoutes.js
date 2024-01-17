const express = require('express');
const authController = require('../controllers/authController');
// const User = require('../models/user');

const router = express.Router();

// POSTs
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

// GETs kkk
router.get('/generate-playlist/:category', authController.generatePlaylist);

module.exports = router;