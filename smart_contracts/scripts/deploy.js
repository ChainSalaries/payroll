const { ethers } = require("hardhat");

async function main() {
  // Compile contracts if not already compiled
  await hre.run('compile');

  // Get the deployer's account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the USDC contract
  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();
  console.log("USDC deployed to:", usdc.address);

  // Deploy the Payroll contract with the address of the deployed USDC contract
  const Payroll = await ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy(usdc.address);
  await payroll.deployed();
  console.log("Payroll deployed to:", payroll.address);

  // Additional setup or interactions can be done here if needed
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  