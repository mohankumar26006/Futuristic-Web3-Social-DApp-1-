// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title HeLaSocial
 * @dev Main smart contract for HeLa Social DApp
 * @notice Handles posts, tips, reputation, and social interactions on-chain
 */
contract HeLaSocial {
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    address public owner;
    uint256 public postCount;
    uint256 public userCount;
    
    // Structs
    struct User {
        address walletAddress;
        string username;
        uint256 reputation;
        bool isVerified;
        uint256 joinedAt;
        uint256 totalTipsReceived;
        uint256 totalTipsSent;
    }
    
    struct Post {
        uint256 id;
        address author;
        string contentHash; // IPFS hash
        uint256 timestamp;
        uint256 likes;
        uint256 tips;
        uint256 tipAmount;
        bool isNFT;
        bool isActive;
    }
    
    // Mappings
    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public postLikes; // postId => user => liked
    mapping(address => bool) public isRegistered;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event UserRegistered(address indexed user, string username, uint256 timestamp);
    event PostCreated(uint256 indexed postId, address indexed author, string contentHash, bool isNFT);
    event PostLiked(uint256 indexed postId, address indexed liker, uint256 newLikeCount);
    event TipSent(uint256 indexed postId, address indexed from, address indexed to, uint256 amount);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    event PostDeleted(uint256 indexed postId, address indexed author);
    
    // ============================================
    // MODIFIERS
    // ============================================
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    modifier onlyRegistered() {
        require(isRegistered[msg.sender], "User not registered");
        _;
    }
    
    modifier postExists(uint256 _postId) {
        require(_postId > 0 && _postId <= postCount, "Post does not exist");
        require(posts[_postId].isActive, "Post is deleted");
        _;
    }
    
    // ============================================
    // CONSTRUCTOR
    // ============================================
    
    constructor() {
        owner = msg.sender;
    }
    
    // ============================================
    // USER FUNCTIONS
    // ============================================
    
    /**
     * @dev Register a new user
     */
    function registerUser(string memory _username) public {
        require(!isRegistered[msg.sender], "User already registered");
        require(bytes(_username).length > 0, "Username cannot be empty");
        
        users[msg.sender] = User({
            walletAddress: msg.sender,
            username: _username,
            reputation: 0,
            isVerified: false,
            joinedAt: block.timestamp,
            totalTipsReceived: 0,
            totalTipsSent: 0
        });
        
        isRegistered[msg.sender] = true;
        userCount++;
        
        emit UserRegistered(msg.sender, _username, block.timestamp);
    }
    
    /**
     * @dev Get user information
     */
    function getUserInfo(address _user) public view returns (User memory) {
        return users[_user];
    }
    
    // ============================================
    // POST FUNCTIONS
    // ============================================
    
    /**
     * @dev Create a new post
     */
    function createPost(string memory _contentHash, bool _isNFT) public onlyRegistered returns (uint256) {
        require(bytes(_contentHash).length > 0, "Content hash cannot be empty");
        
        postCount++;
        
        posts[postCount] = Post({
            id: postCount,
            author: msg.sender,
            contentHash: _contentHash,
            timestamp: block.timestamp,
            likes: 0,
            tips: 0,
            tipAmount: 0,
            isNFT: _isNFT,
            isActive: true
        });
        
        // Update reputation
        uint256 reputationGain = _isNFT ? 15 : 5;
        users[msg.sender].reputation += reputationGain;
        
        emit PostCreated(postCount, msg.sender, _contentHash, _isNFT);
        emit ReputationUpdated(msg.sender, users[msg.sender].reputation);
        
        return postCount;
    }
    
    /**
     * @dev Like a post
     */
    function likePost(uint256 _postId) public onlyRegistered postExists(_postId) {
        require(!postLikes[_postId][msg.sender], "Already liked this post");
        
        posts[_postId].likes++;
        postLikes[_postId][msg.sender] = true;
        
        // Update author reputation
        address author = posts[_postId].author;
        users[author].reputation += 1;
        
        emit PostLiked(_postId, msg.sender, posts[_postId].likes);
        emit ReputationUpdated(author, users[author].reputation);
    }
    
    /**
     * @dev Unlike a post
     */
    function unlikePost(uint256 _postId) public onlyRegistered postExists(_postId) {
        require(postLikes[_postId][msg.sender], "Not liked yet");
        
        posts[_postId].likes--;
        postLikes[_postId][msg.sender] = false;
        
        // Update author reputation
        address author = posts[_postId].author;
        if (users[author].reputation > 0) {
            users[author].reputation -= 1;
        }
        
        emit ReputationUpdated(author, users[author].reputation);
    }
    
    /**
     * @dev Tip a post creator
     */
    function tipPost(uint256 _postId) public payable onlyRegistered postExists(_postId) {
        require(msg.value > 0, "Tip amount must be greater than 0");
        
        address author = posts[_postId].author;
        require(author != msg.sender, "Cannot tip your own post");
        
        // Transfer tip to author
        payable(author).transfer(msg.value);
        
        // Update post stats
        posts[_postId].tips++;
        posts[_postId].tipAmount += msg.value;
        
        // Update user stats
        users[author].totalTipsReceived += msg.value;
        users[author].reputation += 2;
        users[msg.sender].totalTipsSent += msg.value;
        
        emit TipSent(_postId, msg.sender, author, msg.value);
        emit ReputationUpdated(author, users[author].reputation);
    }
    
    /**
     * @dev Delete a post (only author can delete)
     */
    function deletePost(uint256 _postId) public postExists(_postId) {
        require(posts[_postId].author == msg.sender, "Only author can delete");
        
        posts[_postId].isActive = false;
        
        emit PostDeleted(_postId, msg.sender);
    }
    
    /**
     * @dev Get post information
     */
    function getPost(uint256 _postId) public view postExists(_postId) returns (Post memory) {
        return posts[_postId];
    }
    
    /**
     * @dev Check if user liked a post
     */
    function hasLikedPost(uint256 _postId, address _user) public view returns (bool) {
        return postLikes[_postId][_user];
    }
    
    // ============================================
    // ADMIN FUNCTIONS
    // ============================================
    
    /**
     * @dev Verify a user (only owner)
     */
    function verifyUser(address _user) public onlyOwner {
        require(isRegistered[_user], "User not registered");
        users[_user].isVerified = true;
    }
    
    /**
     * @dev Get contract stats
     */
    function getContractStats() public view returns (
        uint256 totalPosts,
        uint256 totalUsers,
        uint256 contractBalance
    ) {
        return (postCount, userCount, address(this).balance);
    }
    
    // ============================================
    // FALLBACK & RECEIVE
    // ============================================
    
    receive() external payable {}
    fallback() external payable {}
}
