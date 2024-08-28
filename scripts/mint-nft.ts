import { deployments, ethers } from "hardhat";
import { OneDollarNFT__factory } from "../typechain";

const main = async () => {
  const [signer] = await ethers.getSigners();
  const { address } = await deployments.get("OneDollarNFT");
  const nft = OneDollarNFT__factory.connect(address, signer);

  const balanceBefore = await ethers.provider.getBalance(signer.address);
  await nft.mint({ value: ethers.parseEther("0.01") });
  const balanceAfter = await ethers.provider.getBalance(signer.address);

  const cost = ethers.formatEther(balanceBefore - balanceAfter);
  console.log(`Minted NFT for ${cost} ETH`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
