// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract - Payment Timing Tests", function () {
//   let Payroll, payroll;
//   let owner, org, emp1;
//   let snapshotId;

//   before(async function () {
//     [owner, org, emp1] = await ethers.getSigners();

//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy();
//     await payroll.deployed();

//     snapshotId = await ethers.provider.send("evm_snapshot", []);
//   });

//   beforeEach(async function () {
//     await ethers.provider.send("evm_revert", [snapshotId]);
//     snapshotId = await ethers.provider.send("evm_snapshot", []);

//     await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//     await payroll.connect(org).addEmployee(
//       emp1.address,
//       ethers.utils.parseEther("0.1"), // daily salary of 0.1 ETH
//       "Developer",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );

//     const fundAmount = ethers.utils.parseEther("10");
//     await payroll.connect(owner).fundOrganizationTreasury(1, { value: fundAmount });
//   });

//   it("should pay open balance to an employee after 1 day using setLatestPayReceivedBack", async function () {
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 24); // Setting back by 1 day (24 hours)

//     const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryBefore).to.equal(ethers.utils.parseEther("10"));

//     await payroll.connect(org).payOpenBalance(emp1.address);

//     const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalanceAfter).to.equal(0);

//     const emp1Balance = await ethers.provider.getBalance(emp1.address);
//     expect(emp1Balance).to.be.closeTo(ethers.utils.parseEther("10000.1"), ethers.utils.parseEther("0.01")); // Adjust this according to the initial balance of emp1

//     const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryAfter).to.equal(ethers.utils.parseEther("9.9"));
//   });

//   it("should pay open balance to an employee after 2 days using setLatestPayReceivedBack", async function () {
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 48); // Setting back by 2 days (48 hours)

//     const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryBefore).to.equal(ethers.utils.parseEther("10"));

//     await payroll.connect(org).payOpenBalance(emp1.address);

//     const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalanceAfter).to.equal(0);

//     const emp1Balance = await ethers.provider.getBalance(emp1.address);
//     expect(emp1Balance).to.be.closeTo(ethers.utils.parseEther("10000.2"), ethers.utils.parseEther("0.01")); // Adjust this according to the initial balance of emp1

//     const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//     await payroll.connect(owner).transferToEmployee(emp1.address,emp1.address);
//     expect(orgTreasuryAfter).to.equal(ethers.utils.parseEther("9.8"));
//   });
// });
