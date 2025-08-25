const express = require('express');
const { 
  registerUser, 
  registerAdmin, 
  loginUser, 
  getUserProfile 
} = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

// Admin routes
router.post('/register/admin', protect, admin, registerAdmin);

module.exports = router;
