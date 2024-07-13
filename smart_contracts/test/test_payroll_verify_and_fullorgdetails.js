// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payroll Contract - New Functions", function () {
//   let Payroll, payroll;
//   let owner, org, emp1, emp2, emp3;

//   beforeEach(async function () {
//     // Get the ContractFactory and Signers here.
//     [owner, org, emp1, emp2, emp3] = await ethers.getSigners();

//     // Deploy Payroll contract
//     Payroll = await ethers.getContractFactory("Payroll");
//     payroll = await Payroll.deploy();
//     await payroll.deployed();

//     // Add an organization
//     await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

//     // Add employees
//     await payroll.connect(org).addEmployee(
//       emp1.address,
//       ethers.utils.parseEther("1"), // daily salary of 1 ETH
//       "Developer",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );
//     await payroll.connect(org).addEmployee(
//       emp2.address,
//       ethers.utils.parseEther("1.5"), // daily salary of 1.5 ETH
//       "Designer",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );
//     await payroll.connect(org).addEmployee(
//       emp3.address,
//       ethers.utils.parseEther("2"), // daily salary of 2 ETH
//       "Manager",
//       Math.floor(Date.now() / 1000) // current timestamp
//     );

//     // Fund organization's treasury in the payroll contract
//     await payroll.connect(owner).fundOrganizationTreasury(1, { value: ethers.utils.parseEther("10") }); // 10 ETH
//   });

//   describe("Get Full Organization Details", function () {
//     it("should return full details of the organization including employees and their open balances", async function () {
//       // Set latest pay received back by 80 hours for all employees
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 80);
//       await payroll.connect(owner).setLatestPayReceivedBack(emp2.address, 80);
//       await payroll.connect(owner).setLatestPayReceivedBack(emp3.address, 80);

//       const orgDetails = await payroll.getFullOrganizationDetails(org.address);

//       expect(orgDetails.name).to.equal("Org Inc.");
//       expect(orgDetails.id).to.equal(1);
//       expect(orgDetails.balance).to.equal(ethers.utils.parseEther("10"));

//       const employeesList = orgDetails.employeesList;
//       expect(employeesList.length).to.equal(3);

//       const openBalances = orgDetails.openBalances;
//       expect(openBalances.length).to.equal(3);

//       const openBalanceEmp1 = openBalances[0];
//       expect(openBalanceEmp1).to.equal(ethers.utils.parseEther("3")); // 80 hours ~ 3.33 days, so 3 days * 1 ETH

//       const openBalanceEmp2 = openBalances[1];
//       expect(openBalanceEmp2).to.equal(ethers.utils.parseEther("4.5")); // 3 days * 1.5 ETH

//       const openBalanceEmp3 = openBalances[2];
//       expect(openBalanceEmp3).to.equal(ethers.utils.parseEther("6")); // 3 days * 2 ETH

//       for (let i = 0; i < employeesList.length; i++) {
//         const employeeOpenBalance = await payroll.calculateOpenBalance(employeesList[i].employeeAccount); // Calculate the openBalance
//         expect(employeeOpenBalance).to.equal(openBalances[i]);
//       }
//     });
//   });

//   describe("Get Employee Details with Open Balance", function () {
//     it("should return an employee's details including calculated open balance", async function () {
//       // Set latest pay received back by 80 hours for the employee
//       await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 80);

//       const employee = await payroll.getEmployee(emp1.address);
//       expect(employee.openBalance).to.equal(ethers.utils.parseEther("3")); // 80 hours ~ 3.33 days, so 3 days * 1 ETH
//     });
//   });
// });
