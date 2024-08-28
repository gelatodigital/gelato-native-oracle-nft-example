import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-deploy";

import * as dotenv from "dotenv";
dotenv.config();

const CHAIN_ID = process.env.CHAIN_ID;
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.26",
        settings: {
          optimizer: { enabled: true, runs: 999999 },
          evmVersion: "paris",
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    testnet: {
      chainId: Number(CHAIN_ID),
      url: RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
