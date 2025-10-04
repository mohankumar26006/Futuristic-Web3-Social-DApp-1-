require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  
  networks: {
    // Local development network
    hardhat: {
      chainId: 1337
    },
    
    // HeLa Testnet
    helaTestnet: {
      url: process.env.HELA_TESTNET_RPC || "https://testnet-rpc.hela.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8668, // Replace with actual HeLa testnet chain ID
      gasPrice: "auto"
    },
    
    // HeLa Mainnet
    helaMainnet: {
      url: process.env.HELA_MAINNET_RPC || "https://rpc.hela.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8668, // Replace with actual HeLa mainnet chain ID
      gasPrice: "auto"
    }
  },
  
  etherscan: {
    apiKey: {
      helaTestnet: process.env.HELA_API_KEY || "",
      helaMainnet: process.env.HELA_API_KEY || ""
    },
    customChains: [
      {
        network: "helaTestnet",
        chainId: 8668,
        urls: {
          apiURL: "https://testnet-explorer-api.hela.network/api",
          browserURL: "https://testnet-explorer.hela.network"
        }
      },
      {
        network: "helaMainnet",
        chainId: 8668,
        urls: {
          apiURL: "https://explorer-api.hela.network/api",
          browserURL: "https://explorer.hela.network"
        }
      }
    ]
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  
  mocha: {
    timeout: 40000
  }
};
