// ============================================
// Deployment Script for HeLa Social Smart Contracts
// ============================================

const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting HeLa Social Smart Contract Deployment...\n");
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("💰 Account balance:", hre.ethers.utils.formatEther(balance), "HELA\n");
  
  // ============================================
  // Deploy HeLaSocial Contract
  // ============================================
  
  console.log("📄 Deploying HeLaSocial contract...");
  const HeLaSocial = await hre.ethers.getContractFactory("HeLaSocial");
  const helaSocial = await HeLaSocial.deploy();
  await helaSocial.deployed();
  
  console.log("✅ HeLaSocial deployed to:", helaSocial.address);
  console.log("🔗 Transaction hash:", helaSocial.deployTransaction.hash);
  console.log("");
  
  // ============================================
  // Deploy HeLaNFT Contract
  // ============================================
  
  console.log("📄 Deploying HeLaNFT contract...");
  const HeLaNFT = await hre.ethers.getContractFactory("HeLaNFT");
  const helaNFT = await HeLaNFT.deploy();
  await helaNFT.deployed();
  
  console.log("✅ HeLaNFT deployed to:", helaNFT.address);
  console.log("🔗 Transaction hash:", helaNFT.deployTransaction.hash);
  console.log("");
  
  // ============================================
  // Save Deployment Information
  // ============================================
  
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      HeLaSocial: {
        address: helaSocial.address,
        transactionHash: helaSocial.deployTransaction.hash
      },
      HeLaNFT: {
        address: helaNFT.address,
        transactionHash: helaNFT.deployTransaction.hash
      }
    }
  };
  
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  const fileName = `${hre.network.name}-${Date.now()}.json`;
  const filePath = path.join(deploymentsDir, fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", filePath);
  console.log("");
  
  // ============================================
  // Generate Frontend Config
  // ============================================
  
  const frontendConfig = `// Auto-generated contract addresses
// Network: ${hre.network.name}
// Generated: ${new Date().toISOString()}

export const CONTRACT_ADDRESSES = {
  SOCIAL_CONTRACT: "${helaSocial.address}",
  NFT_CONTRACT: "${helaNFT.address}",
  CHAIN_ID: ${hre.network.config.chainId},
  NETWORK: "${hre.network.name}"
};

export const SOCIAL_CONTRACT_ABI = ${JSON.stringify(helaSocial.interface.format('json'), null, 2)};

export const NFT_CONTRACT_ABI = ${JSON.stringify(helaNFT.interface.format('json'), null, 2)};
`;
  
  const configPath = path.join(__dirname, "../../utils/contracts.ts");
  fs.writeFileSync(configPath, frontendConfig);
  console.log("⚙️  Frontend config generated at:", configPath);
  console.log("");
  
  // ============================================
  // Verify Contracts (if not local network)
  // ============================================
  
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("⏳ Waiting for block confirmations...");
    await helaSocial.deployTransaction.wait(5);
    await helaNFT.deployTransaction.wait(5);
    
    console.log("🔍 Verifying contracts on block explorer...");
    
    try {
      await hre.run("verify:verify", {
        address: helaSocial.address,
        constructorArguments: []
      });
      console.log("✅ HeLaSocial verified");
    } catch (error) {
      console.log("⚠️  HeLaSocial verification failed:", error.message);
    }
    
    try {
      await hre.run("verify:verify", {
        address: helaNFT.address,
        constructorArguments: []
      });
      console.log("✅ HeLaNFT verified");
    } catch (error) {
      console.log("⚠️  HeLaNFT verification failed:", error.message);
    }
  }
  
  // ============================================
  // Summary
  // ============================================
  
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:");
  console.log("   HeLaSocial:", helaSocial.address);
  console.log("   HeLaNFT:", helaNFT.address);
  console.log("\n🌐 Network:", hre.network.name);
  console.log("⛓️  Chain ID:", hre.network.config.chainId);
  console.log("\n💡 Next Steps:");
  console.log("   1. Update .env with contract addresses");
  console.log("   2. Update frontend config");
  console.log("   3. Test contract interactions");
  console.log("   4. Deploy backend API");
  console.log("=".repeat(60) + "\n");
}

// Run deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
