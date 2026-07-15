const express = require('express');
const router = express.Router();

// @route   POST /api/admin/login
// @desc    Simple password-based admin authentication
// @access  Public
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  // Validate password is provided
  if (!password || password.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      error: 'Password is required' 
    });
  }

  // Validate admin password is configured
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ 
      success: false, 
      error: 'Admin password not configured' 
    });
  }
  
  // Validate password matches
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ 
      success: true, 
      message: 'Authentication successful' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid password' 
    });
  }
});

module.exports = router;
