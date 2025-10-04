// ============================================
// Posts Routes - Create, Read, Update, Delete
// ============================================

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');
const { uploadToIPFS } = require('../utils/ipfs');
const { mintNFT, recordPostOnChain } = require('../utils/blockchain');

// Get all posts (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'username name avatar walletAddress isVerified')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username name avatar walletAddress isVerified');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create new post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content, image, isNFT, category } = req.body;

    if (!content && !image) {
      return res.status(400).json({ error: 'Content or image required' });
    }

    // Upload to IPFS if it's an NFT
    let ipfsHash = null;
    let nftTokenId = null;
    
    if (isNFT) {
      const metadata = {
        name: `Post by ${req.user.username}`,
        description: content,
        image: image,
        creator: req.user.walletAddress,
        timestamp: new Date().toISOString()
      };
      
      ipfsHash = await uploadToIPFS(metadata);
      
      // Mint NFT on HeLa blockchain
      const mintResult = await mintNFT(req.user.walletAddress, ipfsHash);
      nftTokenId = mintResult.tokenId;
    }

    // Create post in database
    const post = new Post({
      author: req.user.userId,
      content,
      image,
      isNFT: isNFT || false,
      category: category || 'general',
      ipfsHash,
      nftTokenId,
      likes: [],
      comments: [],
      tips: []
    });

    await post.save();

    // Record on HeLa blockchain
    const txHash = await recordPostOnChain(post._id, req.user.walletAddress, ipfsHash || content);
    
    post.transactionHash = txHash;
    await post.save();

    // Update user reputation
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { reputation: isNFT ? 15 : 5 }
    });

    // Populate author details
    await post.populate('author', 'username name avatar walletAddress isVerified');

    res.status(201).json({
      success: true,
      post,
      transactionHash: txHash,
      message: isNFT ? 'NFT post minted successfully' : 'Post created successfully'
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like a post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if already liked
    const alreadyLiked = post.likes.includes(req.user.userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== req.user.userId);
      await User.findByIdAndUpdate(post.author, { $inc: { reputation: -1 } });
    } else {
      // Like
      post.likes.push(req.user.userId);
      await User.findByIdAndUpdate(post.author, { $inc: { reputation: 1 } });
    }

    await post.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Comment on a post
router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Comment content required' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = {
      author: req.user.userId,
      content,
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();

    // Update author reputation
    await User.findByIdAndUpdate(post.author, { $inc: { reputation: 1 } });

    // Populate comment author
    await post.populate('comments.author', 'username name avatar');

    res.json({
      success: true,
      comment: post.comments[post.comments.length - 1],
      commentsCount: post.comments.length
    });
  } catch (error) {
    console.error('Comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Delete post (only author can delete)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Get user's posts
router.get('/user/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = await Post.find({ author: user._id })
      .populate('author', 'username name avatar walletAddress isVerified')
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

// Get trending posts
router.get('/trending/all', async (req, res) => {
  try {
    const posts = await Post.aggregate([
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
      { $limit: 20 }
    ]);

    await Post.populate(posts, { path: 'author', select: 'username name avatar walletAddress isVerified' });

    res.json({ posts });
  } catch (error) {
    console.error('Get trending posts error:', error);
    res.status(500).json({ error: 'Failed to fetch trending posts' });
  }
});

module.exports = router;
