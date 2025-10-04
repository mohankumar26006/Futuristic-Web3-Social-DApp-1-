// ============================================
// User Model (MongoDB Schema)
// ============================================

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Wallet & Authentication
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  nonce: {
    type: Number,
    default: () => Math.floor(Math.random() * 1000000)
  },
  
  // Profile Information
  username: {
    type: String,
    unique: true,
    sparse: true, // allows null values
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-z0-9_]+$/
  },
  name: {
    type: String,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    maxlength: 200
  },
  avatar: {
    type: String,
    default: function() {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.walletAddress}`;
    }
  },
  coverImage: {
    type: String,
    default: null
  },
  
  // Verification & Status
  isVerified: {
    type: Boolean,
    default: false
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  
  // Reputation & Gamification
  reputation: {
    type: Number,
    default: 0,
    index: true
  },
  level: {
    type: Number,
    default: 1
  },
  badges: [{
    name: String,
    icon: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  achievements: [{
    id: String,
    name: String,
    description: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  
  // Social Stats
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // NFT & Blockchain
  nftsMinted: {
    type: Number,
    default: 0
  },
  totalTipsReceived: {
    type: Number,
    default: 0
  },
  totalTipsSent: {
    type: Number,
    default: 0
  },
  
  // DAO & Governance
  daoReputation: {
    type: Number,
    default: 0
  },
  proposalsCreated: {
    type: Number,
    default: 0
  },
  votescast: {
    type: Number,
    default: 0
  },
  
  // Activity Tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Settings
  settings: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    language: { type: String, default: 'en' },
    privacy: {
      profileVisibility: { type: String, enum: ['public', 'followers', 'private'], default: 'public' },
      showWallet: { type: Boolean, default: true }
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
UserSchema.index({ username: 1 });
UserSchema.index({ reputation: -1 });
UserSchema.index({ createdAt: -1 });

// Virtual for follower count
UserSchema.virtual('followerCount').get(function() {
  return this.followers.length;
});

// Virtual for following count
UserSchema.virtual('followingCount').get(function() {
  return this.following.length;
});

// Method to calculate level from reputation
UserSchema.methods.calculateLevel = function() {
  this.level = Math.floor(this.reputation / 100) + 1;
  return this.level;
};

// Method to add reputation
UserSchema.methods.addReputation = async function(points) {
  this.reputation += points;
  this.calculateLevel();
  await this.save();
  return this.reputation;
};

// Static method to find by wallet
UserSchema.statics.findByWallet = function(walletAddress) {
  return this.findOne({ walletAddress: walletAddress.toLowerCase() });
};

module.exports = mongoose.model('User', UserSchema);
