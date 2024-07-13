const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payroll Contract", function () {
  let Payroll, payroll, USDC, usdc;
  let owner, org, emp1, emp2;
  const initialSupply = ethers.utils.parseUnits("1000000", 6); // 1,000,000 USDC with 6 decimals

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    USDC = await ethers.getContractFactory("USDC");
    [owner, org, emp1, emp2] = await ethers.getSigners();

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
  });

  describe("Deployment", function () {
    it("should set the correct USDC contract address", async function () {
      expect(await payroll.usdc()).to.equal(usdc.address);
    });

    it("should initialize nextOrgId to 1", async function () {
      expect(await payroll.nextOrgId()).to.equal(1);
    });

    it("should initialize totalEmployees to 0", async function () {
      expect(await payroll.totalEmployees()).to.equal(0);
    });
  });

  describe("Employee Payment", function () {
    beforeEach(async function () {
      // Add an organization
      await payroll.connect(owner).addOrganization(org.address, "Org Inc.");

      // Add an employee
      await payroll.connect(org).addEmployee(
        emp1.address,
        ethers.utils.parseUnits("100", 6), // daily salary of 100 USDC
        "Developer",
        Math.floor(Date.now() / 1000) // current timestamp
      );

      // Ensure org has enough allowance for payroll
      await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("100000", 6));

      // Fund organization's treasury in the payroll contract
      await usdc.connect(org).approve(payroll.address, ethers.utils.parseUnits("10000", 6));
      await payroll.connect(owner).fundOrganizationTreasury(1, ethers.utils.parseUnits("10000", 6)); // 10,000 USDC
    });

    it("should calculate open balance and pay employee", async function () {
        // expect(0).to.equal(0);
      // Fast forward time by 1 day (86400 seconds)
      await ethers.provider.send("evm_increaseTime", [86400]);
      await ethers.provider.send("evm_mine");

      const openBalanceBefore = await payroll.calculateOpenBalance(emp1.address);
      expect(openBalanceBefore).to.equal(ethers.utils.parseUnits("100", 6));

      console.log('huidige',msg.sender);

      const orgTreasuryBefore = (await payroll.getOrganization()).orgTreasury;
      expect(orgTreasuryBefore).to.equal(ethers.utils.parseUnits("100000", 6));

    //   // Pay the open balance to the employee
    //   await payroll.connect(org).payOpenBalance(emp1.address);

    //   const openBalanceAfter = await payroll.calculateOpenBalance(emp1.address);
    //   expect(openBalanceAfter).to.equal(0);

    //   const emp1Balance = await usdc.balanceOf(emp1.address);
    //   expect(emp1Balance).to.equal(ethers.utils.parseUnits("100", 6));

    //   const orgTreasuryAfter = (await payroll.getOrganization()).orgTreasury;
    //   expect(orgTreasuryAfter).to.equal(ethers.utils.parseUnits("99900", 6));
    });

    // it("should fail to pay if insufficient allowance", async function () {
    //   // Remove allowance
    //   await usdc.connect(org).approve(payroll.address, 0);

    //   // Fast forward time by 1 day (86400 seconds)
    //   await ethers.provider.send("evm_increaseTime", [86400]);
    //   await ethers.provider.send("evm_mine");

    //   await expect(payroll.connect(org).payOpenBalance(emp1.address)).to.be.revertedWith("Insufficient allowance for payroll contract");
    // });

    // it("should fail to pay if insufficient funds in org treasury", async function () {
    //   // Fast forward time by 2000 days (172800000 seconds)
    //   await ethers.provider.send("evm_increaseTime", [172800000]);
    //   await ethers.provider.send("evm_mine");

    //   await expect(payroll.connect(org).payOpenBalance(emp1.address)).to.be.revertedWith("Insufficient funds in organization treasury");
    // });

    // it("should set startMoment back", async function () {
    //   // Set startMoment back by 10 days
    //   await payroll.connect(owner).setStartMomentBack(emp1.address, 10);

    //   const employee = await payroll.employees(emp1.address);
    //   const expectedStartMoment = Math.floor(Date.now() / 1000) - (10 * 86400);

    //   expect(employee.startMoment).to.be.closeTo(expectedStartMoment, 100); // Allow for some time difference
    // });

    // it("should set latestPayReceived back", async function () {
    //   // Set latestPayReceived back by 10 days
    //   await payroll.connect(owner).setLatestPayReceivedBack(emp1.address, 10);

    //   const employee = await payroll.employees(emp1.address);
    //   const expectedLatestPayReceived = Math.floor(Date.now() / 1000) - (10 * 86400);

    //   expect(employee.latestPayReceived).to.be.closeTo(expectedLatestPayReceived, 100); // Allow for some time difference
    // });
  });
});