// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title HeLaNFT
 * @dev NFT contract for HeLa Social posts
 * @notice Allows users to mint their posts as NFTs
 */
contract HeLaNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // ============================================
    // STATE VARIABLES
    // ============================================
    
    struct NFTMetadata {
        uint256 tokenId;
        address creator;
        string contentHash; // IPFS hash
        uint256 mintedAt;
        uint256 price;
        bool isListed;
    }
    
    // Mappings
    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(address => uint256[]) public creatorNFTs;
    mapping(uint256 => uint256) public nftPrice;
    
    // Royalty percentage (in basis points, e.g., 250 = 2.5%)
    uint256 public royaltyPercentage = 250;
    
    // Platform fee
    uint256 public platformFee = 200; // 2%
    address public platformWallet;
    
    // ============================================
    // EVENTS
    // ============================================
    
    event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed from, address indexed to, uint256 price);
    event NFTUnlisted(uint256 indexed tokenId);
    event RoyaltyPaid(uint256 indexed tokenId, address indexed creator, uint256 amount);
    
    // ============================================
    // CONSTRUCTOR
    // ============================================
    
    constructor() ERC721("HeLa Social NFT", "HSNFT") {
        platformWallet = msg.sender;
    }
    
    // ============================================
    // MINTING FUNCTIONS
    // ============================================
    
    /**
     * @dev Mint a new NFT
     */
    function mintNFT(string memory _tokenURI, string memory _contentHash) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        
        nftMetadata[newTokenId] = NFTMetadata({
            tokenId: newTokenId,
            creator: msg.sender,
            contentHash: _contentHash,
            mintedAt: block.timestamp,
            price: 0,
            isListed: false
        });
        
        creatorNFTs[msg.sender].push(newTokenId);
        
        emit NFTMinted(newTokenId, msg.sender, _tokenURI);
        
        return newTokenId;
    }
    
    /**
     * @dev Batch mint multiple NFTs
     */
    function batchMintNFT(string[] memory _tokenURIs, string[] memory _contentHashes) public returns (uint256[] memory) {
        require(_tokenURIs.length == _contentHashes.length, "Arrays length mismatch");
        require(_tokenURIs.length <= 20, "Max 20 NFTs per batch");
        
        uint256[] memory tokenIds = new uint256[](_tokenURIs.length);
        
        for (uint256 i = 0; i < _tokenURIs.length; i++) {
            tokenIds[i] = mintNFT(_tokenURIs[i], _contentHashes[i]);
        }
        
        return tokenIds;
    }
    
    // ============================================
    // MARKETPLACE FUNCTIONS
    // ============================================
    
    /**
     * @dev List NFT for sale
     */
    function listNFT(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(_price > 0, "Price must be greater than 0");
        
        nftMetadata[_tokenId].price = _price;
        nftMetadata[_tokenId].isListed = true;
        
        emit NFTListed(_tokenId, _price);
    }
    
    /**
     * @dev Unlist NFT from sale
     */
    function unlistNFT(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender, "Not the owner");
        
        nftMetadata[_tokenId].isListed = false;
        
        emit NFTUnlisted(_tokenId);
    }
    
    /**
     * @dev Buy listed NFT
     */
    function buyNFT(uint256 _tokenId) public payable {
        require(nftMetadata[_tokenId].isListed, "NFT not listed for sale");
        require(msg.value >= nftMetadata[_tokenId].price, "Insufficient payment");
        
        address seller = ownerOf(_tokenId);
        address creator = nftMetadata[_tokenId].creator;
        uint256 price = nftMetadata[_tokenId].price;
        
        // Calculate fees
        uint256 platformFeAmount = (price * platformFee) / 10000;
        uint256 royaltyAmount = 0;
        
        // Pay royalty to creator if not the seller
        if (creator != seller) {
            royaltyAmount = (price * royaltyPercentage) / 10000;
            payable(creator).transfer(royaltyAmount);
            emit RoyaltyPaid(_tokenId, creator, royaltyAmount);
        }
        
        // Pay platform fee
        payable(platformWallet).transfer(platformFeAmount);
        
        // Pay seller
        uint256 sellerAmount = price - platformFeAmount - royaltyAmount;
        payable(seller).transfer(sellerAmount);
        
        // Transfer NFT
        _transfer(seller, msg.sender, _tokenId);
        
        // Unlist NFT
        nftMetadata[_tokenId].isListed = false;
        
        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
        
        emit NFTSold(_tokenId, seller, msg.sender, price);
    }
    
    // ============================================
    // VIEW FUNCTIONS
    // ============================================
    
    /**
     * @dev Get NFT metadata
     */
    function getNFTMetadata(uint256 _tokenId) public view returns (NFTMetadata memory) {
        return nftMetadata[_tokenId];
    }
    
    /**
     * @dev Get all NFTs by creator
     */
    function getNFTsByCreator(address _creator) public view returns (uint256[] memory) {
        return creatorNFTs[_creator];
    }
    
    /**
     * @dev Get total NFTs minted
     */
    function getTotalNFTs() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Check if NFT is listed
     */
    function isNFTListed(uint256 _tokenId) public view returns (bool) {
        return nftMetadata[_tokenId].isListed;
    }
    
    // ============================================
    // ADMIN FUNCTIONS
    // ============================================
    
    /**
     * @dev Set platform fee (only owner)
     */
    function setPlatformFee(uint256 _fee) public onlyOwner {
        require(_fee <= 1000, "Fee cannot exceed 10%");
        platformFee = _fee;
    }
    
    /**
     * @dev Set royalty percentage (only owner)
     */
    function setRoyaltyPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage <= 1000, "Royalty cannot exceed 10%");
        royaltyPercentage = _percentage;
    }
    
    /**
     * @dev Set platform wallet (only owner)
     */
    function setPlatformWallet(address _wallet) public onlyOwner {
        platformWallet = _wallet;
    }
    
    /**
     * @dev Withdraw platform funds (only owner)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
    
    // ============================================
    // OVERRIDE FUNCTIONS
    // ============================================
    
    /**
     * @dev Override transfer to track ownership
     */
    function _transfer(address from, address to, uint256 tokenId) internal override {
        super._transfer(from, to, tokenId);
        
        // Remove from old owner's list
        uint256[] storage fromNFTs = creatorNFTs[from];
        for (uint256 i = 0; i < fromNFTs.length; i++) {
            if (fromNFTs[i] == tokenId) {
                fromNFTs[i] = fromNFTs[fromNFTs.length - 1];
                fromNFTs.pop();
                break;
            }
        }
        
        // Add to new owner's list (if not creator)
        if (to != nftMetadata[tokenId].creator) {
            creatorNFTs[to].push(tokenId);
        }
    }
}
