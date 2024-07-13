// // test/PayrollTest.js

// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract", function () {
//   let Payroll, payroll;
//   let deployer, backend, emp1, org1, org2, emp2, emp3;
//   const addressMapping = {
//     "Backend": "0xd669D3CeEb4f573EB6FB172Fd50e4449F0F500F5",
//     "Employee1": "0xc8f459883c537fA2F88593836820dA11c526a043",
//     "Org1": "0x8Ca16DE2E8A02D9e9Ebc1F893F80C69bad756282",
//     "Org2": "0x267e99B6a52f9546cD4d498eb77BA986Bd3fB751",
//     "Employee2": "0xaF30e09cbD25302A725d34985d11a9bA3d811d4b",
//     "Employee3": "0xf58743E561d6AEe28ee91Da6f91507068b2f1AcF"
//   };

//   beforeEach(async function () {
//     [deployer] = await ethers.getSigners();

//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy();
//     await payroll.deployed();

//     org2 = addressMapping["Org2"];
//     emp2 = addressMapping["Employee2"];
//     emp3 = addressMapping["Employee3"];
//   });

//   it("Should deploy the Payroll contract", async function () {
//     console.log("Deploying contracts with the account:", deployer.address);
//     console.log("Payroll contract deployed to:", payroll.address);
//     expect(payroll.address).to.properAddress;
//   });

//   it("Should add organization Org2", async function () {
//     await payroll.connect(deployer).addOrganization(org2, "Org LLC");
//     const orgDetails = await payroll.getOrganization(org2);
//     console.log("Organization added: Org LLC (org2)", org2);
//     expect(orgDetails.orgAddress).to.equal(org2);
//   });

//   it("Should fund organization Org2 and check treasury balance", async function () {
//     const initialFundAmount = ethers.utils.parseEther("0.1");
//     await deployer.sendTransaction({ to: org2, value: initialFundAmount });

//     await payroll.connect(deployer).fundOrganizationTreasury(1, { value: initialFundAmount });
//     const orgDetails = await payroll.getFullOrganizationDetails(org2);
//     console.log("Organization Org2's treasury funded with:", initialFundAmount.toString(), "ETH");
//     expect(ethers.utils.formatEther(orgDetails.balance)).to.equal("0.1");
//   });

//   it("Should add employees and set their pay received back by 2 months", async function () {
//     const dailyWage = ethers.utils.parseEther("0.0001");
//     const startMoment = Math.floor(Date.now() / 1000);

//     await payroll.connect(deployer).addEmployee(emp2, dailyWage, "Developer", startMoment);
//     await payroll.connect(deployer).addEmployee(emp3, dailyWage, "Designer", startMoment);

//     const emp2Details = await payroll.getEmployee(emp2);
//     const emp3Details = await payroll.getEmployee(emp3);

//     console.log("Employees emp2 and emp3 added to Org LLC with a daily wage of 0.0001 ETH");

//     expect(emp2Details.dailySalaryWei.toString()).to.equal(dailyWage.toString());
//     expect(emp3Details.dailySalaryWei.toString()).to.equal(dailyWage.toString());

//     const hoursBack = 60 * 24;
//     await payroll.connect(deployer).setLatestPayReceivedBack(emp2, hoursBack);
//     await payroll.connect(deployer).setLatestPayReceivedBack(emp3, hoursBack);

//     console.log("Set latest pay received back by 2 months for emp2 and emp3");

//     const emp2DetailsAfter = await payroll.getEmployee(emp2);
//     const emp3DetailsAfter = await payroll.getEmployee(emp3);

//     const currentTime = Math.floor(Date.now() / 1000);
//     const expectedLatestPayReceived = currentTime - (hoursBack * 3600);

//     expect(emp2DetailsAfter.latestPayReceived).to.be.closeTo(expectedLatestPayReceived, 10);
//     expect(emp3DetailsAfter.latestPayReceived).to.be.closeTo(expectedLatestPayReceived, 10);
//   });

//   it("Should handle payments correctly", async function () {
//     const dailyWage = ethers.utils.parseEther("0.0001");
//     const totalWage = dailyWage.mul(60).mul(2);
//     const additionalFundAmount = ethers.utils.parseEther("0.4");
//     const fundAmount = totalWage.add(additionalFundAmount);

//     await payroll.connect(deployer).fundOrganizationTreasury(1, { value: fundAmount });

//     console.log("Organization Org2's treasury funded with:", fundAmount.toString(), "ETH");

//     const orgDetailsBeforePayment = await payroll.getFullOrganizationDetails(org2);
//     console.log("Org2 treasury balance before payments:", ethers.utils.formatEther(orgDetailsBeforePayment.balance));

//     const emp2OpenBalance = await payroll.calculateOpenBalance(emp2);
//     const emp3OpenBalance = await payroll.calculateOpenBalance(emp3);

//     console.log(`emp2 Open Balance: ${ethers.utils.formatEther(emp2OpenBalance)} ETH`);
//     console.log(`emp3 Open Balance: ${ethers.utils.formatEther(emp3OpenBalance)} ETH`);

//     const totalRequired = emp2OpenBalance.add(emp3OpenBalance).mul(2);
//     console.log(`Total required for payments: ${ethers.utils.formatEther(totalRequired)} ETH`);

//     const orgDetails = await payroll.getFullOrganizationDetails(org2);
//     const orgTreasuryBalance = ethers.BigNumber.from(orgDetails.balance);
//     console.log(`Org2 treasury balance available: ${ethers.utils.formatEther(orgTreasuryBalance)} ETH`);

//     expect(orgTreasuryBalance.gte(totalRequired)).to.be.true;

//     for (let i = 0; i < 2; i++) {
//       console.log(`Payment ${i + 1} for emp2 and emp3`);
//       await payroll.connect(deployer).payOpenBalance(emp2);
//       await payroll.connect(deployer).payOpenBalance(emp3);
//     }

//     console.log("Completed 2 payments for emp2 and emp3");

//     const orgDetailsAfterPayment = await payroll.getFullOrganizationDetails(org2);
//     console.log("Org2 treasury balance after payments:", ethers.utils.formatEther(orgDetailsAfterPayment.balance));
//   });
// });