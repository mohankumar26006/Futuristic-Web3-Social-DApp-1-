# 🚀 HeLa Social - Complete Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Smart Contract Deployment](#smart-contract-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Testing](#testing)
7. [Production Checklist](#production-checklist)

---

## 🔧 Prerequisites

### Required Software
```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB >= 6.0
Git
```

### Required Accounts
- [ ] HeLa Blockchain wallet with test HELA tokens
- [ ] MongoDB Atlas account (free tier)
- [ ] Vercel account (free tier)
- [ ] Render/Railway account (free tier)
- [ ] Pinata account for IPFS (free tier)

---

## ⚙️ Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/hela-social.git
cd hela-social
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend-example
npm install
```

#### Blockchain
```bash
cd blockchain
npm install
```

### 3. Environment Variables

#### **Frontend (.env)**
```env
# HeLa Blockchain
VITE_HELA_RPC_URL=https://testnet-rpc.hela.network
VITE_HELA_CHAIN_ID=8668
VITE_SOCIAL_CONTRACT_ADDRESS=0x...
VITE_NFT_CONTRACT_ADDRESS=0x...

# IPFS
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET=your_pinata_secret

# API
VITE_API_URL=http://localhost:5000/api
```

#### **Backend (.env)**
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/helasocial

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# HeLa Blockchain
HELA_RPC_URL=https://testnet-rpc.hela.network
SOCIAL_CONTRACT_ADDRESS=0x...
NFT_CONTRACT_ADDRESS=0x...
BLOCKCHAIN_PRIVATE_KEY=your_private_key_here

# IPFS
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET=your_pinata_secret
```

#### **Blockchain (.env)**
```env
PRIVATE_KEY=your_deployer_private_key
HELA_TESTNET_RPC=https://testnet-rpc.hela.network
HELA_MAINNET_RPC=https://rpc.hela.network
HELA_API_KEY=your_hela_explorer_api_key
```

---

## 🔗 Smart Contract Deployment

### Step 1: Compile Contracts
```bash
cd blockchain
npx hardhat compile
```

Expected output:
```
✓ Compiled 2 Solidity files successfully
```

### Step 2: Test Contracts (Optional)
```bash
npx hardhat test
```

### Step 3: Deploy to HeLa Testnet
```bash
npx hardhat run scripts/deploy.js --network helaTestnet
```

Expected output:
```
🚀 Starting HeLa Social Smart Contract Deployment...
📝 Deploying contracts with account: 0x...
💰 Account balance: 100.0 HELA

✅ HeLaSocial deployed to: 0xABCD1234...
✅ HeLaNFT deployed to: 0xEFGH5678...

🎉 DEPLOYMENT COMPLETE!
```

### Step 4: Save Contract Addresses
Copy the deployed contract addresses and update:
1. Frontend `.env` file
2. Backend `.env` file
3. `utils/contracts.ts` (auto-generated)

### Step 5: Deploy to HeLa Mainnet (Production)
```bash
npx hardhat run scripts/deploy.js --network helaMainnet
```

---

## 🖥️ Backend Deployment

### Option 1: Deploy to Render

#### 1. Create Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

#### 2. Create New Web Service
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Select `backend-example` folder

#### 3. Configure Service
```yaml
Name: hela-social-backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

#### 4. Add Environment Variables
Add all variables from backend `.env` file

#### 5. Deploy
Click "Create Web Service" - deployment starts automatically

### Option 2: Deploy to Railway

```bash
cd backend-example
npm install -g @railway/cli
railway login
railway init
railway up
```

### Verify Backend
```bash
curl https://your-backend-url.onrender.com/health

# Expected response:
{
  "status": "online",
  "blockchain": "HeLa",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## 🌐 Frontend Deployment

### Deploy to Vercel

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login
```bash
vercel login
```

#### 3. Deploy
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? hela-social
# - Directory? ./
# - Override settings? No
```

#### 4. Add Environment Variables
```bash
vercel env add VITE_HELA_RPC_URL
vercel env add VITE_SOCIAL_CONTRACT_ADDRESS
vercel env add VITE_NFT_CONTRACT_ADDRESS
vercel env add VITE_API_URL
# ... add all other env vars
```

#### 5. Deploy to Production
```bash
vercel --prod
```

Your app will be live at: `https://hela-social.vercel.app`

---

## 🧪 Testing

### 1. Test Smart Contracts
```bash
cd blockchain
npx hardhat test

# Run specific test
npx hardhat test test/HeLaSocial.test.js
```

### 2. Test Backend API
```bash
cd backend-example
npm test

# Or use Postman
# Import: /backend-example/postman/hela-social-api.json
```

### 3. Test Frontend
```bash
npm run dev
# Open http://localhost:5173
```

### Integration Test Checklist
- [ ] Wallet connection works
- [ ] User registration on blockchain
- [ ] Post creation and minting
- [ ] Tipping functionality
- [ ] NFT minting and display
- [ ] DAO voting
- [ ] Messaging system
- [ ] Notifications
- [ ] Profile updates

---

## ✅ Production Checklist

### Security
- [ ] All private keys stored in environment variables (never in code)
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] JWT secrets are strong and unique
- [ ] Smart contracts verified on HeLa explorer
- [ ] MongoDB IP whitelist configured

### Performance
- [ ] Frontend assets optimized
- [ ] Images compressed
- [ ] Database indexes created
- [ ] Caching implemented
- [ ] CDN configured for static assets

### Monitoring
- [ ] Backend logging set up
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Blockchain transaction monitoring
- [ ] Database backup configured
- [ ] Uptime monitoring

### Documentation
- [ ] API documentation complete
- [ ] Smart contract documentation
- [ ] User guide created
- [ ] README updated
- [ ] License added

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    HELA SOCIAL ARCHITECTURE                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐
│   FRONTEND   │  React + Tailwind CSS
│  (Vercel)    │  → User Interface
└──────┬───────┘
       │
       │ API Calls
       ▼
┌──────────────┐
│   BACKEND    │  Node.js + Express
│ (Render/     │  → Business Logic
│  Railway)    │  → Authentication
└──────┬───────┘
       │
       ├─────────────┐
       │             │
       ▼             ▼
┌──────────────┐  ┌──────────────┐
│   MONGODB    │  │ HELA BLOCKCHAIN│
│ (Atlas)      │  │  → Smart      │
│ → User Data  │  │    Contracts  │
│ → Posts      │  │  → NFTs       │
│ → Messages   │  │  → Tips       │
└──────────────┘  └──────────────┘
       │
       ▼
┌──────────────┐
│     IPFS     │
│  (Pinata)    │
│ → NFT Media  │
│ → Images     │
└──────────────┘
```

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy HeLa Social

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## 🆘 Troubleshooting

### Common Issues

#### 1. **Contract Deployment Fails**
```bash
Error: insufficient funds for gas

Solution:
- Get test HELA tokens from faucet
- Check wallet balance
```

#### 2. **MongoDB Connection Failed**
```bash
Error: MongoNetworkError

Solution:
- Check MongoDB URI in .env
- Verify IP whitelist in MongoDB Atlas
- Check network connectivity
```

#### 3. **Wallet Connection Issues**
```bash
Error: No injected provider

Solution:
- Install MetaMask
- Add HeLa network to MetaMask
- Switch to HeLa network
```

#### 4. **CORS Errors**
```bash
Error: CORS policy blocked

Solution:
- Update FRONTEND_URL in backend .env
- Check CORS configuration in server.js
```

---

## 📞 Support

- **Documentation**: [docs.helasocial.io](https://docs.helasocial.io)
- **Discord**: [discord.gg/helasocial](https://discord.gg/helasocial)
- **Email**: support@helasocial.io
- **GitHub Issues**: [github.com/helasocial/issues](https://github.com/helasocial/issues)

---

## 🏆 Success Metrics

After deployment, monitor:
- ✅ Smart contract gas usage
- ✅ API response times (<200ms)
- ✅ Frontend load time (<3s)
- ✅ Database query performance
- ✅ User registration rate
- ✅ NFT minting success rate
- ✅ Transaction confirmation time

---

**Built with ❤️ for Smart India Hackathon 2025**  
**Powered by HeLa Blockchain** ⚡
