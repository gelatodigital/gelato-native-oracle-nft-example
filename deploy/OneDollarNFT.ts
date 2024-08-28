import { DeployFunction } from "hardhat-deploy/types";
import hre from "hardhat";

const func: DeployFunction = async () => {
  const accounts = await hre.getNamedAccounts();

  await hre.deployments.deploy("OneDollarNFT", {
    from: accounts.deployer,
    log: true,
  });
};

func.tags = ["OneDollarNFT"];

export default func;
