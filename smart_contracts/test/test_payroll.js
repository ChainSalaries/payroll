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
//   });

//   describe("Deployment", function () {
//     it("should set the correct USDC contract address", async function () {
//       expect(await payroll.usdc()).to.equal(usdc.address);
//     });

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
//       await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
//       await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC

//       const addedOrg = await payroll.getOrganization(org.address);
//       expect(addedOrg.orgTreasury).to.equal(ethers.utils.parseUnits("10000", 6));
//     });
//   });

//   describe("Employee Management", function () {
//     beforeEach(async function () {
//       // Add an organization
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");
//     });

//     it("should add an employee", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       const employee = await payroll.employees(emp1.address);
//       expect(employee.employeeAccount).to.equal(emp1.address);
//       expect(employee.companyAccount).to.equal(org.address);
//       expect(employee.dailySalaryUSDC).to.equal(ethers.utils.parseUnits("100", 6));
//     });

//     it("should get an employee", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       const employee = await payroll.getEmployee(emp1.address);
//       expect(employee.employeeAccount).to.equal(emp1.address);
//       expect(employee.companyAccount).to.equal(org.address);
//       expect(employee.companyName).to.equal("Org Inc.");
//       expect(employee.dailySalaryUSDC).to.equal(ethers.utils.parseUnits("100", 6));
//       expect(employee.activity).to.equal("Developer");
//     });

//     it("should get the total number of employees", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseUnits("100", 6),
//         "Developer",
//         Math.floor(Date.now() / 1000)
//       );
//       await payroll.connect(org).addEmployee(
//         emp2.address,
//         ethers.utils.parseUnits("150", 6),
//         "Designer",
//         Math.floor(Date.now() / 1000)
//       );

//       expect(await payroll.getTotalEmployees()).to.equal(2);
//     });

//     it("should get the number of employees in an organization", async function () {
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseUnits("100", 6),
//         "Developer",
//         Math.floor(Date.now() / 1000)
//       );
//       await payroll.connect(org).addEmployee(
//         emp2.address,
//         ethers.utils.parseUnits("150", 6),
//         "Designer",
//         Math.floor(Date.now() / 1000)
//       );

//       expect(await payroll.getEmployeesByOrganization(1)).to.equal(2);
//     });
//   });

//   describe("Payroll Functions", function () {
//     beforeEach(async function () {
//       // Add an organization
//       await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//       // Add an employee
//       await payroll.connect(org).addEmployee(
//         emp1.address,
//         ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
//         "Developer",
//         Math.floor(Date.now() / 1000) // current timestamp
//       );

//       // Fund organization's treasury in the payroll contract
//       await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
//       await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC

//       // Ensure org has enough allowance for payroll
//       await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("100000", 6));
//     });

//     it("should calculate open balance for an employee", async function () {
//       // Set latest pay received back by 1 day (24 hours)
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 24);

//       const openBalance = await payroll.calculateOpenBalance(emp1.address);
//       expect(openBalance).to.equal(ethers.utils.parseUnits("100", 6));
//     });

//     it("should set latestPayReceived back", async function () {
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 240); // Set back by 10 days (240 hours)

//       const employee = await payroll.employees(emp1.address);
//       const expectedLatestPayReceived = Math.floor(Date.now() / 1000) - (240 * 3600);

//       expect(employee.latestPayReceived).to.be.closeTo(expectedLatestPayReceived, 100); // Allow for some time difference
//     });
//   });
// });