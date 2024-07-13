// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract", function () {
//   let Payroll, payroll;
//   let owner, org, emp1, emp2;
//   let snapshotId;

//   before(async function () {
//     [owner, org, emp1, emp2] = await ethers.getSigners();

//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy();
//     await payroll.deployed();

//     const fundAmount = ethers.utils.parseEther("10");

//     snapshotId = await ethers.provider.send("evm_snapshot", []);
//   });

//   beforeEach(async function () {
//     await ethers.provider.send("evm_revert", [snapshotId]);
//     snapshotId = await ethers.provider.send("evm_snapshot", []);
//   });

//   describe("Deployment", function () {
//     it("should initialize nextOrgId to 1", async function () {
//       expect(await payroll.nextOrgId()).to.equal(1);
//     });

//     it("should initialize totalEmployees to 0", async function () {
//       expect(await payroll.totalEmployees()).to.equal(0);
//     });
//   });

//   describe("Organization Management", function () {
//     it("should add an organization", async function () {
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");
//       const addedOrg = await payroll.getOrganization(org.address);
//       expect(addedOrg.orgName).to.equal("Org Inc.");
//       expect(addedOrg.orgAddress).to.equal(org.address);
//       expect(addedOrg.orgTreasury).to.equal(0);
//     });

//     it("should fund the organization's treasury", async function () {
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");
//       await payroll.connect(owner).fundOrganizationTreasury(1, { value: ethers.utils.parseEther("1") });

//       const addedOrg = await payroll.getOrganization(org.address);
//       expect(addedOrg.orgTreasury).to.equal(ethers.utils.parseEther("1"));
//     });
//   });

//   describe("Employee Management", function () {
//     beforeEach(async function () {
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");
//     });

//     it("should add an employee", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseEther("0.1"), // daily salary of 0.1 ETH
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       const employee = await payroll.employees(emp1.address);
//       expect(employee.employeeAccount).to.equal(emp1.address);
//       expect(employee.companyAccount).to.equal(org.address);
//       expect(employee.dailySalaryWei).to.equal(ethers.utils.parseEther("0.1"));
//     });

//     it("should get an employee", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseEther("0.1"), // daily salary of 0.1 ETH
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       const employee = await payroll.getEmployee(emp1.address);
//       expect(employee.employeeAccount).to.equal(emp1.address);
//       expect(employee.companyAccount).to.equal(org.address);
//       expect(employee.companyName).to.equal("Org Inc.");
//       expect(employee.dailySalaryWei).to.equal(ethers.utils.parseEther("0.1"));
//       expect(employee.activity).to.equal("Developer");
//     });

//     it("should get the total number of employees", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseEther("0.1"),
//         "Developer",
//         Math.floor(Date.now() / 1000)
//       );
//       await payroll.connect(org).addEmployee(
//         emp2.address,
//         ethers.utils.parseEther("0.15"),
//         "Designer",
//         Math.floor(Date.now() / 1000)
//       );

//       expect(await payroll.getTotalEmployees()).to.equal(2);
//     });

//     it("should get the number of employees in an organization", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseEther("0.1"),
//         "Developer",
//         Math.floor(Date.now() / 1000)
//       );
//       await payroll.connect(org).addEmployee(
//         emp2.address,
//         ethers.utils.parseEther("0.15"),
//         "Designer",
//         Math.floor(Date.now() / 1000)
//       );

//       expect(await payroll.getEmployeesByOrganization(1)).to.equal(2);
//     });
//   });

//   describe("Payroll Functions", function () {
//     beforeEach(async function () {
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseEther("0.1"), // daily salary of 0.1 ETH
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       const fundAmount = ethers.utils.parseEther("10");
//       await payroll.connect(owner).fundOrganizationTreasury(1, { value: fundAmount });
//     });

//     it("should calculate open balance for an employee", async function () {
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 24);

//       const openBalance = await payroll.calculateOpenBalance(emp1.address);
//       expect(openBalance).to.equal(ethers.utils.parseEther("0.1"));
//     });

//     it("should set latestPayReceived back", async function () {
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 240);

//       const employee = await payroll.employees(emp1.address);
//       const expectedLatestPayReceived = Math.floor(Date.now() / 1000) - (240 * 3600);

//       expect(employee.latestPayReceived).to.be.closeTo(expectedLatestPayReceived, 100);
//     });

//     it("should pay open balance to an employee if more than a day has passed", async function () {
//         await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 48);
  
//         const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//         expect(orgTreasuryBefore).to.equal(ethers.utils.parseEther("10"));
  
//         await payroll.connect(org).payOpenBalance(emp1.address);
  
//         const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//         expect(openBalanceAfter).to.equal(0);
  
//         const emp1Balance = await ethers.provider.getBalance(emp1.address);
//         expect(emp1Balance).to.be.closeTo(ethers.utils.parseEther("10000.2"), ethers.utils.parseEther("0.01")); // Adjust this according to the initial balance of emp1
  
//         const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//         expect(orgTreasuryAfter).to.equal(ethers.utils.parseEther("9.8"));
//       });

//       it("should pay nothing if the diff is less than 24 hours", async function () {
//         await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 10);
  
//         const orgTreasuryBefore = (await payroll.getOrganization(org.address)).orgTreasury;
//         expect(orgTreasuryBefore).to.equal(ethers.utils.parseEther("10"));
  
//         await payroll.connect(org).payOpenBalance(emp1.address);
  
//         const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
//         expect(openBalanceAfter).to.equal(0);
  
//         const emp1Balance = await ethers.provider.getBalance(emp1.address);
//         expect(emp1Balance).to.be.closeTo(ethers.utils.parseEther("10000"), ethers.utils.parseEther("0.01")); // Adjust this according to the initial balance of emp1
  
//         const orgTreasuryAfter = (await payroll.getOrganization(org.address)).orgTreasury;
//         expect(orgTreasuryAfter).to.equal(ethers.utils.parseEther("10"));
//       });
//   });
// });
