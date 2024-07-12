async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const USDC = await ethers.getContractFactory("USDC");
    const usdc = await USDC.deploy();
  
    await usdc.deployed();
    console.log("USDC deployed to:", usdc.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    