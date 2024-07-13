const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimplePayroll Contract", function () {
  let SimplePayroll, payroll;
  let owner, company, employee;

  beforeEach(async function () {
    [owner, company, employee] = await ethers.getSigners();

    SimplePayroll = await ethers.getContractFactory("SimplePayroll");
    payroll = await SimplePayroll.deploy();
    await payroll.deployed();
  });

  describe("Company Management", function () {
    it("should add a company", async function () {
      await payroll.connect(company).addCompany("Company Inc.");

      const addedCompany = await payroll.companies(company.address);
      expect(addedCompany.companyAddress).to.equal(company.address);
      expect(addedCompany.companyName).to.equal("Company Inc.");
      expect(addedCompany.treasury).to.equal(0);
    });

    it("should fund the company's treasury", async function () {
      await payroll.connect(company).addCompany("Company Inc.");

      const fundAmount = ethers.utils.parseEther("1");
      await payroll.connect(company).fundCompany({ value: fundAmount });

      const fundedCompany = await payroll.companies(company.address);
      expect(fundedCompany.treasury).to.equal(fundAmount);
    });
  });

  describe("Employee Management", function () {
    beforeEach(async function () {
      await payroll.connect(company).addCompany("Company Inc.");
    });

    it("should add an employee", async function () {
      const dailyWage = ethers.utils.parseEther("0.0001");
      const activity = "Developer";
      await payroll.connect(company).addEmployee(employee.address, dailyWage, activity);

      const addedEmployee = await payroll.employees(employee.address);
      expect(addedEmployee.employeeAddress).to.equal(employee.address);
      expect(addedEmployee.dailyWageWei).to.equal(dailyWage);
      expect(addedEmployee.daysWorked).to.equal(0);
      expect(addedEmployee.companyAddress).to.equal(company.address);
      expect(addedEmployee.activity).to.equal(activity);
    });

    it("should update days worked for an employee", async function () {
      const dailyWage = ethers.utils.parseEther("0.0001");
      const activity = "Developer";
      await payroll.connect(company).addEmployee(employee.address, dailyWage, activity);
      await payroll.connect(company).updateDaysWorked(employee.address, 10);

      const updatedEmployee = await payroll.employees(employee.address);
      expect(updatedEmployee.daysWorked).to.equal(10);
    });
  });

  describe("Payout Function", function () {
    beforeEach(async function () {
      await payroll.connect(company).addCompany("Company Inc.");
      const dailyWage = ethers.utils.parseEther("0.0001");
      const activity = "Developer";
      await payroll.connect(company).addEmployee(employee.address, dailyWage, activity);

      const fundAmount = ethers.utils.parseEther("1");
      await payroll.connect(company).fundCompany({ value: fundAmount });
    });

    it("should payout the correct amount to the employee", async function () {
      await payroll.connect(company).updateDaysWorked(employee.address, 10);

      const employeeInitialBalance = await ethers.provider.getBalance(employee.address);

      await payroll.connect(company).payout(employee.address);

      const updatedEmployee = await payroll.employees(employee.address);
      const employeeFinalBalance = await ethers.provider.getBalance(employee.address);
      const companyAfterPayout = await payroll.companies(company.address);

      const expectedPayout = ethers.utils.parseEther("0.001"); // 0.0001 * 10 days
      expect(updatedEmployee.daysWorked).to.equal(0);
      expect(employeeFinalBalance.sub(employeeInitialBalance)).to.equal(expectedPayout);
      expect(companyAfterPayout.treasury).to.equal(ethers.utils.parseEther("1").sub(expectedPayout));
    });

    it("should fail if there are insufficient funds in the company treasury", async function () {
      await payroll.connect(company).updateDaysWorked(employee.address, 10000000);

      await expect(payroll.connect(company).payout(employee.address)).to.be.revertedWith("Insufficient funds in company treasury");
    });

    it("should verify an employee's worldid", async function () {
      const dailyWage = ethers.utils.parseEther("0.0001");
      const activity = "Developer";
      await payroll.connect(company).addEmployee(employee.address, dailyWage, activity);

      await payroll.connect(company).verifyEmployee(employee.address);

      const verifiedEmployee = await payroll.employees(employee.address);
      expect(verifiedEmployee.worldidverified).to.equal(1);
    });

    it("should get the details of a company", async function () {
      await payroll.connect(company).addCompany("Company Inc.");

      const companyDetails = await payroll.getCompany(company.address);

      expect(companyDetails.companyAddress).to.equal(company.address);
      expect(companyDetails.companyName).to.equal("Company Inc.");
      expect(companyDetails.treasury).to.equal(0);
    });

    it("should get the details of an employee", async function () {
      const dailyWage = ethers.utils.parseEther("0.0001");
      const activity = "Developer";
      await payroll.connect(company).addCompany("Company Inc.");
      await payroll.connect(company).addEmployee(employee.address, dailyWage, activity);
      await payroll.connect(company).updateDaysWorked(employee.address, 5);

      const employeeDetails = await payroll.getEmployee(employee.address);

      expect(employeeDetails.employeeAddress).to.equal(employee.address);
      expect(employeeDetails.companyAddress).to.equal(company.address);
      expect(employeeDetails.dailyWageWei).to.equal(dailyWage);
      expect(employeeDetails.daysWorked).to.equal(5);
      expect(employeeDetails.worldidverified).to.equal(0);
      expect(employeeDetails.activity).to.equal(activity);
    });
  });
});
