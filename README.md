# Gelato Native Oracle NFT Example

This example project demonstrates an NFT mint which costs **$1 worth of Ether**.  
The [conversion of ETH/USD](https://github.com/gelatodigital/gelato-native-oracle-nft-example/blob/main/contracts/OneDollarNFT.sol#L20-L24) is powered by the natively integrated `L2PriceOracle` using the [`gelato-native-oracle-sdk`](https://www.npmjs.com/package/@gelatonetwork/gelato-native-oracle-sdk).

## Quick Start Guide

> [!TIP]
> A minimum of ~0.02 ETH is required for the following steps.

1. Install dependencies
   ```
   yarn install
   ```
2. Edit `.env`
   ```
   cp .env.example .env
   ```
3. Deploy NFT contract
   ```
   yarn hardhat deploy --network testnet
   ```
4. Mint NFT
   ```
   yarn hardhat run scripts/mint-nft.ts --network testnet
   ```
