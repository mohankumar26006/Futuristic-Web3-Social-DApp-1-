// ============================================
// Authentication Routes - Wallet-based Auth
// ============================================

const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate nonce for wallet signature
router.post('/nonce', async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress || !ethers.utils.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    // Generate random nonce
    const nonce = Math.floor(Math.random() * 1000000);
    
    // Check if user exists, if not create placeholder
    let user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      user = new User({
        walletAddress: walletAddress.toLowerCase(),
        nonce: nonce,
        isNewUser: true
      });
    } else {
      user.nonce = nonce;
    }
    
    await user.save();

    res.json({ 
      nonce,
      message: `Sign this message to authenticate with HeLa Social: ${nonce}`,
      isNewUser: !user.username // true if profile not completed
    });
  } catch (error) {
    console.error('Nonce generation error:', error);
    res.status(500).json({ error: 'Failed to generate nonce' });
  }
});

// Verify wallet signature and login
router.post('/verify', async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find user and their nonce
    const user = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please request nonce first.' });
    }

    // Verify signature
    const message = `Sign this message to authenticate with HeLa Social: ${user.nonce}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Generate new nonce for next login
    user.nonce = Math.floor(Math.random() * 1000000);
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        walletAddress: user.walletAddress,
        userId: user._id 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        username: user.username,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        reputation: user.reputation,
        isVerified: user.isVerified,
        needsProfile: !user.username // true if needs to complete signup
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify signature' });
  }
});

// Complete user profile (after wallet authentication)
router.post('/complete-profile', async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const { username, name, bio, avatar } = req.body;

    if (!username || !name) {
      return res.status(400).json({ error: 'Username and name are required' });
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ 
      username: username.toLowerCase(),
      _id: { $ne: decoded.userId }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      {
        username: username.toLowerCase(),
        name,
        bio: bio || '',
        avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        profileCompleted: true
      },
      { new: true }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        username: user.username,
        name: user.name,
        bio: user.bio,
        avatar: user.avatar,
        reputation: user.reputation,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(500).json({ error: 'Failed to complete profile' });
  }
});

// Get current user profile
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-nonce');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

module.exports = router;
