// ============================================
// Post Model (MongoDB Schema)
// ============================================

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PostSchema = new mongoose.Schema({
  // Author Information
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Content
  content: {
    type: String,
    maxlength: 1000
  },
  image: {
    type: String // URL or IPFS hash
  },
  category: {
    type: String,
    enum: ['general', 'healthtech', 'edtech', 'fintech', 'nft', 'gaming', 'dao', 'defi', 'art', 'music'],
    default: 'general'
  },
  hashtags: [{
    type: String,
    lowercase: true
  }],
  
  // NFT Related
  isNFT: {
    type: Boolean,
    default: false
  },
  nftTokenId: {
    type: String,
    sparse: true // unique only if not null
  },
  ipfsHash: {
    type: String
  },
  nftPrice: {
    type: Number, // in HELA tokens
    default: 0
  },
  nftOwner: {
    type: String, // wallet address
    default: null
  },
  
  // Blockchain
  transactionHash: {
    type: String,
    index: true
  },
  blockNumber: {
    type: Number
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  
  // Engagement
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [CommentSchema],
  tips: [{
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    token: { type: String, default: 'HELA' },
    transactionHash: String,
    timestamp: { type: Date, default: Date.now }
  }],
  shares: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  
  // Metadata
  isPinned: {
    type: Boolean,
    default: false
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportCount: {
    type: Number,
    default: 0
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ category: 1, createdAt: -1 });
PostSchema.index({ isNFT: 1 });
PostSchema.index({ hashtags: 1 });

// Virtual for like count
PostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
PostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual for tip count and total
PostSchema.virtual('tipStats').get(function() {
  return {
    count: this.tips.length,
    total: this.tips.reduce((sum, tip) => sum + tip.amount, 0)
  };
});

// Method to add like
PostSchema.methods.addLike = async function(userId) {
  if (!this.likes.includes(userId)) {
    this.likes.push(userId);
    await this.save();
  }
  return this.likes.length;
};

// Method to remove like
PostSchema.methods.removeLike = async function(userId) {
  this.likes = this.likes.filter(id => id.toString() !== userId.toString());
  await this.save();
  return this.likes.length;
};

// Method to add comment
PostSchema.methods.addComment = async function(userId, content) {
  this.comments.push({
    author: userId,
    content
  });
  await this.save();
  return this.comments[this.comments.length - 1];
};

// Method to add tip
PostSchema.methods.addTip = async function(fromUserId, amount, txHash) {
  this.tips.push({
    from: fromUserId,
    amount,
    transactionHash: txHash
  });
  await this.save();
  return this.tips[this.tips.length - 1];
};

// Static method to get trending posts
PostSchema.statics.getTrending = function(limit = 20) {
  return this.aggregate([
    {
      $addFields: {
        score: {
          $add: [
            { $size: '$likes' },
            { $multiply: [{ $size: '$comments' }, 2] },
            { $multiply: [{ $size: '$tips' }, 3] }
          ]
        }
      }
    },
    { $sort: { score: -1, createdAt: -1 } },
    { $limit: limit }
  ]);
};

// Static method to get posts by category
PostSchema.statics.getByCategory = function(category, limit = 20) {
  return this.find({ category })
    .populate('author', 'username name avatar walletAddress isVerified')
    .sort({ createdAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Post', PostSchema);
