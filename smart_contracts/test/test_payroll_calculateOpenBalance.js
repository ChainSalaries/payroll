// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract - calculateOpenBalance", function () {
//   let Payroll, payroll;
//   let owner, org, emp1;
//   let snapshotId;

//   before(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, org, emp1] = await ethers.getSigners();

//     // Deploy Payroll contract
//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy();
//     await payroll.deployed();

//     // Add an organization
//     await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//     // Add an employee
//     await payroll.connect(org).addEmployee(
//       emp1.address,
//       ethers.utils.parseEther("0.1"), // daily salary of 0.1 ETH
//       "Developer",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );

//     // Fund organization's treasury in the payroll contract
//     const fundAmount = ethers.utils.parseEther("10");
//     await payroll.connect(owner).fundOrganizationTreasury(1, { value: fundAmount });

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

//   it("should return correct balance after 1 day", async function () {
//     // Set latest pay received back by 1 day (24 hours)
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 24);

//     const openBalance = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalance).to.equal(ethers.utils.parseEther("0.1")); // 0.1 ETH for 1 day
//   });

//   it("should return correct balance after 10 days", async function () {
//     // Set latest pay received back by 10 days (240 hours)
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 240);

//     const openBalance = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalance).to.equal(ethers.utils.parseEther("1")); // 0.1 ETH per day * 10 days
//   });
// });
