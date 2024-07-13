// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract", function () {
//   let Payroll, payroll, USDC, usdc;
//   let owner, org, emp1, emp2;
//   const initialSupply = ethers.utils.parseUnits("1000000", 6); // 1,000,000 USDC with 6 decimals

//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     USDC = await ethers.getContractFactory("USDC");
//     [owner, org, emp1, emp2] = await ethers.getSigners();

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

//     // Fund organization's treasury in the payroll contract
//     await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
//     await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC

//     // Ensure org has enough allowance for payroll
//     await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("100000", 6));
//   });

//   it("should pay open balance to an employee if more than a day has passed", async function () {
//     // Set latest pay received back by 2 days (48 hours)
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 48);

//     const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryBefore).to.equal(ethers.utils.parseUnits("10000", 6));

//     const employee_t1 = await payroll.getEmployee(emp1.address);
//     const currentTimestamp_t1 = await ethers.provider.getBlock('latest').then(block => block.timestamp);

//     await payroll.connect(org).payOpenBalance(emp1.address);

//     const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalanceAfter).to.equal(0);

//     const emp1Balance = await usdc.balanceOf(emp1.address);
//     expect(emp1Balance).to.equal(ethers.utils.parseUnits("200", 6));

//     const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryAfter).to.equal(ethers.utils.parseUnits("9800", 6));
//   });

//   it("should pay nothing if the diff is less than 24 hours", async function () {
//     // Set latest pay received back by 10 hours
//     await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 10);

//     const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryBefore).to.equal(ethers.utils.parseUnits("10000", 6));

//     const employee_t1 = await payroll.getEmployee(emp1.address);
//     const currentTimestamp_t1 = await ethers.provider.getBlock('latest').then(block => block.timestamp);

//     await payroll.connect(org).payOpenBalance(emp1.address);

//     const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//     expect(openBalanceAfter).to.equal(0);

//     const emp1Balance = await usdc.balanceOf(emp1.address);
//     expect(emp1Balance).to.equal(ethers.utils.parseUnits("0", 6));

//     const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//     expect(orgTreasuryAfter).to.equal(ethers.utils.parseUnits("10000", 6));
//   });
// });
