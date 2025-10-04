# 🚀 HeLa Social - Complete Tech Stack Documentation

## 📋 Project Overview
**HeLa Social** is a decentralized Web3 social media DApp built for the HeLa blockchain with 34+ pages, NFT functionality, DAO governance, and comprehensive blockchain integration.

---

## 🧩 1. Frontend (User Interface)

### ✅ **Languages Used**
- ✅ **HTML5** - Embedded in React JSX components
- ✅ **CSS3** - Tailwind CSS v4 + Custom CSS
- ✅ **JavaScript (ES6+)** - Core interactivity
- ✅ **TypeScript** - Type safety (using .tsx files)

### ✅ **Frameworks & Libraries**
```json
{
  "React.js": "Latest - Modern, fast UI",
  "Tailwind CSS v4": "Futuristic responsive design",
  "ShadCN UI": "Professional UI components",
  "Lucide React": "Icon system",
  "Sonner": "Toast notifications",
  "Recharts": "Analytics charts"
}
```

### 📁 **Frontend Structure**

#### **HTML Structure (JSX)**
All components use semantic HTML5 within JSX:
```
/components/
├── LoginPage.tsx      → <div>, <form>, <input>, <button>
├── Header.tsx         → <header>, <nav>, <ul>, <li>
├── HomePage.tsx       → <main>, <section>, <article>
├── ProfilePage.tsx    → <div>, <img>, <p>, <h1>
└── ...34 more pages
```

#### **CSS Styling (Tailwind + Custom)**
```
/styles/
└── globals.css        → Root CSS variables, animations, utilities

Inline Tailwind Classes:
- className="bg-gradient-to-r from-blue-500 to-purple-600"
- className="flex items-center justify-between"
- className="rounded-2xl shadow-lg hover:scale-105"
```

#### **JavaScript Logic (TypeScript)**
```
/App.tsx               → Main app logic, routing, state management
/components/*.tsx      → Component logic, event handlers
/utils/sampleData.ts   → Data structures, mock blockchain data
```

---

## 🧠 2. Backend (Server + Logic)

### **Current Setup (Frontend-First MVP)**
```
Status: Frontend-heavy architecture
Mock Data: /utils/sampleData.ts
Blockchain Simulation: Transaction hash generation, wallet addresses
```

### **Production Backend (Recommended)**
```javascript
// Node.js + Express.js Backend Structure
backend/
├── server.js              → Express server
├── routes/
│   ├── auth.js           → Wallet authentication
│   ├── posts.js          → Post CRUD operations
│   ├── nft.js            → NFT minting endpoints
│   └── dao.js            → DAO governance
├── models/
│   ├── User.js           → MongoDB user schema
│   ├── Post.js           → Post schema
│   └── NFT.js            → NFT metadata
├── controllers/
│   └── blockchain.js     → HeLa blockchain integration
└── middleware/
    └── auth.js           → JWT + Web3 verification
```

### **Database Structure**
```javascript
// MongoDB Collections
{
  users: {
    walletAddress: String,
    username: String,
    name: String,
    bio: String,
    avatar: String,
    reputation: Number,
    createdAt: Date
  },
  posts: {
    postId: String,
    author: ObjectId,
    content: String,
    image: String,
    isNFT: Boolean,
    transactionHash: String,
    likes: Number,
    tips: Number,
    timestamp: Date
  },
  nfts: {
    tokenId: String,
    owner: String,
    metadata: Object,
    contractAddress: String,
    blockchain: "HeLa"
  }
}
```

---

## 🔗 3. Blockchain Integration (Web3)

### **Smart Contracts (Solidity)**

#### **HeLaSocial.sol - Main Contract**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HeLaSocial {
    struct Post {
        uint256 id;
        address author;
        string contentHash; // IPFS hash
        uint256 timestamp;
        uint256 likes;
        uint256 tips;
    }
    
    struct User {
        address walletAddress;
        string username;
        uint256 reputation;
        bool isVerified;
    }
    
    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    uint256 public postCount;
    
    event PostCreated(uint256 indexed postId, address indexed author);
    event TipSent(address indexed from, address indexed to, uint256 amount);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    
    function createPost(string memory _contentHash) public {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _contentHash, block.timestamp, 0, 0);
        emit PostCreated(postCount, msg.sender);
    }
    
    function tipCreator(address _creator) public payable {
        require(msg.value > 0, "Tip must be greater than 0");
        payable(_creator).transfer(msg.value);
        users[_creator].reputation += 2;
        emit TipSent(msg.sender, _creator, msg.value);
    }
    
    function likePost(uint256 _postId) public {
        posts[_postId].likes++;
        users[posts[_postId].author].reputation += 1;
    }
}
```

#### **HeLaNFT.sol - NFT Contract**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HeLaNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC721("HeLa Social NFT", "HSNFT") {}
    
    function mintNFT(address recipient, string memory tokenURI) 
        public returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _tokenURIs[newItemId] = tokenURI;
        return newItemId;
    }
    
    function tokenURI(uint256 tokenId) 
        public view override returns (string memory) 
    {
        return _tokenURIs[tokenId];
    }
}
```

### **Web3 Integration (Frontend)**
```javascript
// /utils/web3.js
import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  }
  throw new Error("MetaMask not installed");
};

export const mintNFTPost = async (signer, contentHash) => {
  const contract = new ethers.Contract(
    "0xYourContractAddress", // HeLa blockchain contract
    NFT_ABI,
    signer
  );
  const tx = await contract.mintNFT(await signer.getAddress(), contentHash);
  await tx.wait();
  return tx.hash;
};

export const sendTip = async (signer, recipientAddress, amount) => {
  const tx = await signer.sendTransaction({
    to: recipientAddress,
    value: ethers.utils.parseEther(amount.toString())
  });
  await tx.wait();
  return tx.hash;
};
```

---

## 🎨 4. CSS Architecture

### **Tailwind v4 Configuration**
```css
/* /styles/globals.css */

/* Custom CSS Variables */
:root {
  --primary: #0095f6;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --font-size: 14px;
  --radius: 0.5rem;
}

/* Custom Animations */
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animated-gradient {
  background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
}
```

### **Component-Level Styling Examples**

#### **LoginPage.tsx - CSS Classes**
```tsx
// Gradient background
className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"

// Animated blob
className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob"

// Button with gradient
className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"

// Card with glass effect
className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
```

#### **Header.tsx - Responsive Design**
```tsx
// Mobile-first responsive
className="hidden lg:flex"           // Show on large screens
className="flex lg:hidden"           // Show on mobile
className="w-full md:w-80 lg:w-96"  // Responsive width
```

---

## 📦 5. File Structure Breakdown

### **HTML Layer (JSX Components)**
```tsx
// Example: LoginPage.tsx
export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex">
      <header>
        <h1>HeLa Social</h1>
      </header>
      
      <main>
        <form onSubmit={handleEmailLogin}>
          <input type="email" />
          <button type="submit">Sign In</button>
        </form>
      </main>
    </div>
  );
}
```

### **CSS Layer (Tailwind + Custom)**
```tsx
// Inline Tailwind (Utility-First)
<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg">

// Custom CSS Classes (globals.css)
<div className="glass animated-gradient">
```

### **JavaScript/TypeScript Layer**
```tsx
// State Management
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userProfile, setUserProfile] = useState<any>(null);

// Event Handlers
const handleWalletConnect = async () => {
  const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
  toast.success("Wallet connected!");
  onLogin(false, mockAddress);
};

// Effects
useEffect(() => {
  // Simulate blockchain confirmation
  setTimeout(() => {
    setPosts(prev => prev.map(post => 
      post.id === newPost.id ? { ...post, isConfirmed: true } : post
    ));
  }, 3000);
}, []);
```

---

## 🚀 6. Deployment Architecture

### **Frontend Deployment (Vercel)**
```bash
# Build command
npm run build

# Output directory
/dist

# Environment variables
VITE_HELA_RPC_URL=https://rpc.hela.network
VITE_NFT_CONTRACT_ADDRESS=0x...
VITE_SOCIAL_CONTRACT_ADDRESS=0x...
```

### **Backend Deployment (Render/Railway)**
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/nft', require('./routes/nft'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### **Smart Contract Deployment (Hardhat)**
```javascript
// hardhat.config.js
module.exports = {
  solidity: "0.8.19",
  networks: {
    hela: {
      url: "https://rpc.hela.network",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

// Deploy script
async function main() {
  const HeLaSocial = await ethers.getContractFactory("HeLaSocial");
  const contract = await HeLaSocial.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}
```

---

## 🔧 7. Development Workflow

### **Install Dependencies**
```bash
npm install
# or
yarn install
```

### **Run Development Server**
```bash
npm run dev
# Runs on http://localhost:5173
```

### **Build for Production**
```bash
npm run build
npm run preview
```

### **Deploy Smart Contracts**
```bash
cd blockchain
npx hardhat compile
npx hardhat run scripts/deploy.js --network hela
```

---

## 📊 8. Current Implementation Status

### ✅ **Completed (Frontend)**
- [x] 34+ Pages (Login, Home, Profile, NFT Gallery, etc.)
- [x] Wallet Connect UI
- [x] Post creation & interaction
- [x] Tipping system UI
- [x] NFT Gallery display
- [x] DAO Governance UI
- [x] Messaging system
- [x] Multi-language support (20 languages)
- [x] Notifications system
- [x] Live activity feed
- [x] Leaderboard & gamification
- [x] Analytics dashboard
- [x] Responsive design (mobile + desktop)

### 🔄 **Pending (Backend Integration)**
- [ ] Real wallet authentication (MetaMask/WalletConnect)
- [ ] MongoDB database setup
- [ ] Smart contract deployment to HeLa
- [ ] IPFS integration for media storage
- [ ] Real-time WebSocket notifications
- [ ] Blockchain transaction confirmations
- [ ] NFT minting on-chain
- [ ] Token tipping with real HELA tokens

### 🎯 **Next Steps**
1. Deploy smart contracts to HeLa testnet
2. Connect frontend to real blockchain
3. Set up MongoDB backend
4. Implement IPFS for decentralized storage
5. Add real wallet authentication
6. Enable actual NFT minting
7. Production deployment to Vercel

---

## 🏆 Summary

**HeLa Social** is built with modern web development best practices:

✅ **HTML5** - Semantic structure in React components  
✅ **CSS3** - Tailwind v4 + Custom animations  
✅ **JavaScript/TypeScript** - Type-safe, modern ES6+  
✅ **React.js** - Component-based architecture  
✅ **Solidity** - Smart contracts (ready to deploy)  
✅ **Web3.js** - Blockchain integration layer  
✅ **Node.js** - Backend API structure (defined)  
✅ **MongoDB** - Database schema (planned)  

**Current State:** Fully functional frontend with mock blockchain data  
**Production Ready:** Smart contract architecture defined, backend structure planned  
**Deployment:** Frontend ready for Vercel, contracts ready for HeLa blockchain

---

**Built for Smart India Hackathon 2025** 🇮🇳  
**Powered by HeLa Blockchain** ⚡
