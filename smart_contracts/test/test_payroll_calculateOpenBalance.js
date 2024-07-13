// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract - calculateOpenBalance", function () {
//   let Payroll, payroll, USDC, usdc;
//   let owner, org, emp1;
//   const initialSupply = ethers.utils.parseUnits("1000000", 6); // 1,000,000 USDC with 6 decimals
//   let snapshotId;

//   before(async function () {
//     // Get the ContractFactory and Signers here.
//     USDC = await ethers.getContractFactory("USDC");
//     [owner, org, emp1] = await ethers.getSigners();

//     // Deploy USDC contract
//     usdc = await USDC.deploy();
//     await usdc.deployed();

//     // Mint initial supply to the owner
//     await usdc.mint(owner.address, initialSupply);

//     // Deploy Payroll contract
//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy(usdc.address);
//     await payroll.deployed();

//     // Transfer some USDC to the org account for payroll
//     await usdc.transfer(org.address, ethers.utils.parseUnits("500000", 6)); // 500,000 USDC

//     // Add an organization
//     await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//     // Add an employee
//     await payroll.connect(org).addEmployee(
//       emp1.address,
//       ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
//       "Developer",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );

//     const openBalance = await payroll.calculateOpenBalance(emp1.address);

//     // Fund organization's treasury in the payroll contract
//     await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
//     await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC

//     // Take a snapshot of the blockchain state
//     snapshotId = await ethers.provider.send("evm_snapshot", []);
//   });

//   beforeEach(async function () {
//     // Revert to the snapshot before each test
//     await ethers.provider.send("evm_revert", [snapshotId]);
//     snapshotId = await ethers.provider.send("evm_snapshot", []);
//   });

//   it("should return 0 balance after 0 hours", async function () {

//     const openBalance = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalance).to.equal(0);
//   });
// });
