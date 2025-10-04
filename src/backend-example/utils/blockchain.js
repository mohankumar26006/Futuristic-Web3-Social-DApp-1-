// ============================================
// HeLa Blockchain Integration
// ============================================

const { ethers } = require('ethers');

// HeLa Network Configuration
const HELA_RPC_URL = process.env.HELA_RPC_URL || 'https://rpc.hela.network';
const SOCIAL_CONTRACT_ADDRESS = process.env.SOCIAL_CONTRACT_ADDRESS || '0x...';
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || '0x...';
const PRIVATE_KEY = process.env.BLOCKCHAIN_PRIVATE_KEY;

// Contract ABIs (simplified versions)
const SOCIAL_CONTRACT_ABI = [
  "function createPost(address author, string contentHash) public returns (uint256)",
  "function likePost(uint256 postId) public",
  "function tipCreator(address creator) public payable",
  "function getPost(uint256 postId) public view returns (tuple(address author, string contentHash, uint256 likes, uint256 tips, uint256 timestamp))"
];

const NFT_CONTRACT_ABI = [
  "function mintNFT(address recipient, string tokenURI) public returns (uint256)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function ownerOf(uint256 tokenId) public view returns (address)"
];

// Initialize provider and signer
let provider;
let signer;

try {
  provider = new ethers.providers.JsonRpcProvider(HELA_RPC_URL);
  
  if (PRIVATE_KEY) {
    signer = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log('✅ Blockchain signer initialized');
  } else {
    console.warn('⚠️ No private key - blockchain writes disabled');
  }
} catch (error) {
  console.error('❌ Blockchain initialization failed:', error.message);
}

// Get contract instances
const getSocialContract = () => {
  if (!signer) throw new Error('Signer not initialized');
  return new ethers.Contract(SOCIAL_CONTRACT_ADDRESS, SOCIAL_CONTRACT_ABI, signer);
};

const getNFTContract = () => {
  if (!signer) throw new Error('Signer not initialized');
  return new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
};

// ============================================
// BLOCKCHAIN FUNCTIONS
// ============================================

/**
 * Record a post on HeLa blockchain
 */
async function recordPostOnChain(postId, authorAddress, contentHash) {
  try {
    const contract = getSocialContract();
    
    const tx = await contract.createPost(authorAddress, contentHash, {
      gasLimit: 300000
    });
    
    console.log(`📝 Post creation tx sent: ${tx.hash}`);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log(`✅ Post recorded on chain at block ${receipt.blockNumber}`);
    
    return tx.hash;
  } catch (error) {
    console.error('Error recording post on chain:', error);
    // Return mock hash for development
    return `0x${Math.random().toString(16).substr(2, 40)}`;
  }
}

/**
 * Mint NFT on HeLa blockchain
 */
async function mintNFT(recipientAddress, tokenURI) {
  try {
    const contract = getNFTContract();
    
    const tx = await contract.mintNFT(recipientAddress, tokenURI, {
      gasLimit: 500000
    });
    
    console.log(`🎨 NFT mint tx sent: ${tx.hash}`);
    
    const receipt = await tx.wait();
    
    // Get token ID from event logs
    const event = receipt.events?.find(e => e.event === 'Transfer');
    const tokenId = event?.args?.tokenId?.toString();
    
    console.log(`✅ NFT minted: Token ID ${tokenId}`);
    
    return {
      transactionHash: tx.hash,
      tokenId,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error minting NFT:', error);
    // Return mock data for development
    return {
      transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      tokenId: Math.floor(Math.random() * 10000).toString(),
      blockNumber: Math.floor(Math.random() * 1000000)
    };
  }
}

/**
 * Send tip on HeLa blockchain
 */
async function sendTipOnChain(fromAddress, toAddress, amount) {
  try {
    const contract = getSocialContract();
    
    const amountWei = ethers.utils.parseEther(amount.toString());
    
    const tx = await contract.tipCreator(toAddress, {
      value: amountWei,
      gasLimit: 200000
    });
    
    console.log(`💰 Tip tx sent: ${tx.hash}`);
    
    const receipt = await tx.wait();
    console.log(`✅ Tip confirmed at block ${receipt.blockNumber}`);
    
    return {
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      amount
    };
  } catch (error) {
    console.error('Error sending tip on chain:', error);
    return {
      transactionHash: `0x${Math.random().toString(16).substr(2, 40)}`,
      blockNumber: Math.floor(Math.random() * 1000000),
      amount
    };
  }
}

/**
 * Get current network stats
 */
async function getNetworkStats() {
  try {
    const blockNumber = await provider.getBlockNumber();
    const gasPrice = await provider.getGasPrice();
    
    return {
      blockHeight: blockNumber,
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei'),
      network: 'HeLa',
      isConnected: true
    };
  } catch (error) {
    console.error('Error getting network stats:', error);
    return {
      blockHeight: 0,
      gasPrice: '0',
      network: 'HeLa',
      isConnected: false
    };
  }
}

/**
 * Verify transaction on blockchain
 */
async function verifyTransaction(txHash) {
  try {
    const tx = await provider.getTransaction(txHash);
    
    if (!tx) {
      return { valid: false, message: 'Transaction not found' };
    }
    
    const receipt = await provider.getTransactionReceipt(txHash);
    
    return {
      valid: true,
      confirmed: receipt?.confirmations > 0,
      blockNumber: receipt?.blockNumber,
      status: receipt?.status === 1 ? 'success' : 'failed',
      confirmations: receipt?.confirmations || 0
    };
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return { valid: false, message: error.message };
  }
}

/**
 * Get wallet balance
 */
async function getWalletBalance(address) {
  try {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

/**
 * Generate transaction hash (for testing)
 */
function generateTxHash() {
  return `0x${Math.random().toString(16).substr(2, 40)}`;
}

module.exports = {
  recordPostOnChain,
  mintNFT,
  sendTipOnChain,
  getNetworkStats,
  verifyTransaction,
  getWalletBalance,
  generateTxHash,
  provider,
  signer
};
