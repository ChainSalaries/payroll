const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payroll Contract - New Functions", function () {
  let Payroll, payroll, USDC, usdc;
  let owner, org, emp1, emp2, emp3;
  const initialSupply = ethers.utils.parseUnits("1000000", 6); // 1,000,000 USDC with 6 decimals

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    USDC = await ethers.getContractFactory("USDC");
    [owner, org, emp1, emp2, emp3] = await ethers.getSigners();

    // Deploy USDC contract
    usdc = await USDC.deploy();
    await usdc.deployed();

    // Mint initial supply to the owner
    await usdc.mint(owner.address, initialSupply);

    // Deploy Payroll contract
    Payroll = await ethers.getContractFactory("Payroll");
    payroll = await Payroll.deploy(usdc.address);
    await payroll.deployed();

    // Transfer some USDC to the org account for payroll
    await usdc.transfer(org.address, ethers.utils.parseUnits("500000", 6)); // 500,000 USDC

    // Add an organization
    await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

    // Add employees
    await payroll.connect(org).addEmployee(
      emp1.address,
      ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
      "Developer",
      Math.floor(Date.now() / 1000) // current timestamp
    );
    await payroll.connect(org).addEmployee(
      emp2.address,
      ethers.utils.parseUnits("150", 6), // daily salary of 150 USDC
      "Designer",
      Math.floor(Date.now() / 1000) // current timestamp
    );
    await payroll.connect(org).addEmployee(
      emp3.address,
      ethers.utils.parseUnits("200", 6), // daily salary of 200 USDC
      "Manager",
      Math.floor(Date.now() / 1000) // current timestamp
    );

    // Fund organization's treasury in the payroll contract
    await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
    await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC

    // Ensure org has enough allowance for payroll
    await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("100000", 6));
  });

  describe("Get Full Organization Details", function () {
    it("should return full details of the organization including employees and their open balances", async function () {
      // Set latest pay received back by 80 hours for all employees
      await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 80);
      await payroll.connect(owner).setLatestPayReceivedBack(emp2.address, 80);
      await payroll.connect(owner).setLatestPayReceivedBack(emp3.address, 80);

      const orgDetails = await payroll.getFullOrganizationDetails(org.address);

      console.log("Organization Details:", orgDetails);

      expect(orgDetails.name).to.equal("Org Inc.");
      expect(orgDetails.id).to.equal(1);
      expect(orgDetails.balance).to.equal(ethers.utils.parseUnits("10000", 6));

      const employeesList = orgDetails.employeesList;
      console.log("Employees List:", employeesList);
      expect(employeesList.length).to.equal(3);

      const openBalances = orgDetails.openBalances;
      console.log("Open Balances:", openBalances);
      expect(openBalances.length).to.equal(3);

      const openBalanceEmp1 = openBalances[0];
      expect(openBalanceEmp1).to.equal(ethers.utils.parseUnits("300", 6)); // 80 hours ~ 3.33 days, so 3 days * 100 USDC

      const openBalanceEmp2 = openBalances[1];
      expect(openBalanceEmp2).to.equal(ethers.utils.parseUnits("450", 6)); // 3 days * 150 USDC

      const openBalanceEmp3 = openBalances[2];
      expect(openBalanceEmp3).to.equal(ethers.utils.parseUnits("600", 6)); // 3 days * 200 USDC

      for (let i = 0; i < employeesList.length; i++) {
        const employeeOpenBalance = await payroll.calculateOpenBalance(employeesList[i].employeeAccount); // Calculate the openBalance
        console.log(`Employee ${i + 1} Open Balance:`, employeeOpenBalance.toString());
        expect(employeeOpenBalance).to.equal(openBalances[i]);
      }
    });
  });

  describe("Get Employee Details with Open Balance", function () {
    it("should return an employee's details including calculated open balance", async function () {
      // Set latest pay received back by 80 hours for the employee
      await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 80);

      const employee = await payroll.getEmployee(emp1.address);
      console.log("Employee Details with Open Balance:", employee);
      expect(employee.openBalance).to.equal(ethers.utils.parseUnits("300", 6)); // 80 hours ~ 3.33 days, so 3 days * 100 USDC
    });
  });
});
