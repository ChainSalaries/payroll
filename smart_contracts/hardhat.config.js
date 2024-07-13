require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const privateKeys = process.env.PRIVATE_KEYS || "";
const PRIVATE_KEY_BACKEND = process.env.PRIVATE_KEY_BACKEND;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: privateKeys.split(","),
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: privateKeys.split(","),
      gasPrice: 20000000000,
    },
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [PRIVATE_KEY_BACKEND],
      gasPrice: 1000000000,
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: privateKeys.split(","),
    },
  },
  etherscan: {
    apiKey: {
      "base-sepolia": process.env.BLOCKSCOUT_API_KEY,
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com",
        },
      },
    ],
  },
};
