// deploy_base.js

async function main() {
    // Get the deployer's account
    const [deployer] = await ethers.getSigners();
  
    // Employee address for base-sepolia network
    const addressMapping = {
      "Employee2": "0xaF30e09cbD25302A725d34985d11a9bA3d811d4b"
    };
  
    const emp2 = addressMapping["Employee2"];
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the ContractFactory and deploy the contract
    const Payroll = await ethers.getContractFactory("Payroll");
    const payroll = await Payroll.deploy();
  
    await payroll.deployed();
  
    console.log("Payroll contract deployed to:", payroll.address);
  
    // Fund the smart contract with 0.1 ETH
    const initialFundAmount = ethers.utils.parseEther("0.1");
    await deployer.sendTransaction({ to: payroll.address, value: initialFundAmount });
  
    console.log("Payroll contract funded with 0.1 ETH");
  
    // Transfer 0.0001 ETH to emp2
    await payroll.connect(deployer).transferToEmployee(emp2);
  
    console.log("Transferred 0.0001 ETH to Employee2");
  }
  
  // Run the main function
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
    