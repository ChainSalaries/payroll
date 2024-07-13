const { ethers } = require("hardhat");

async function main() {
  // Compile contracts if not already compiled
  await hre.run('compile');

  // Get signers
  const [owner] = await ethers.getSigners();

  // Deploy the USDC contract
  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();
  await usdc.deployed();
  console.log("USDC deployed to:", usdc.address);

  // Deploy the Payroll contract with the address of the deployed USDC contract
  const Payroll = await ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy(usdc.address);
  await payroll.deployed();
  console.log("Payroll deployed to:", payroll.address);

  // Addresses to mint USDC to
  const addresses = [
    "0xd669D3CeEb4f573EB6FB172Fd50e4449F0F500F5",
    "0x8Ca16DE2E8A02D9e9Ebc1F893F80C69bad756282",
    "0x267e99B6a52f9546cD4d498eb77BA986Bd3fB751"
  ];

  // Mint 100,000 USDC (6 decimals) to each address
  const mintAmount = ethers.utils.parseUnits("100000", 6);
  for (let address of addresses) {
    await usdc.mint(address, mintAmount);
    console.log(`Minted 100,000 USDC to ${address}`);
  }

  // Approve Payroll contract to spend max amount of USDC for each address
  const maxAmount = ethers.constants.MaxUint256;
  for (let address of addresses) {
    const signer = await ethers.getSigner(address);
    await usdc.connect(signer).approve(payroll.address, maxAmount);
    console.log(`Approved Payroll contract to spend max amount of USDC for ${address}`);
  }

  // Add an organization
  const orgAddress = "0x267e99B6a52f9546cD4d498eb77BA986Bd3fB751";
  await payroll.connect(owner).addOrganization(orgAddress, "mock_organization");
  console.log(`Added organization mock_organization with address ${orgAddress}`);

  // Fund the organization's treasury
  const fundAmount = ethers.utils.parseUnits("50000", 6); // 50,000 USDC
  await usdc.connect(owner).transfer(orgAddress, fundAmount); // Transfer USDC to organization
  const orgId = await payroll.organizationIds(orgAddress);
  await usdc.connect(await ethers.getSigner(orgAddress)).approve(payroll.address, fundAmount);
  await payroll.connect(owner).fundOrganizationTreasury(orgId, fundAmount);
  console.log(`Funded organization mock_organization's treasury with 50,000 USDC`);

  // Add two employees to the organization
  const employees = [
    { address: "0xaF30e09cbD25302A725d34985d11a9bA3d811d4b", dailySalary: "100", activity: "Engineer" },
    { address: "0xf58743E561d6AEe28ee91Da6f91507068b2f1AcF", dailySalary: "150", activity: "Designer" }
  ];
  const currentTime = Math.floor(Date.now() / 1000);
  for (let employee of employees) {
    await payroll.connect(await ethers.getSigner(orgAddress)).addEmployee(
      employee.address,
      ethers.utils.parseUnits(employee.dailySalary, 6),
      employee.activity,
      currentTime
    );
    console.log(`Added employee ${employee.address} with daily salary ${employee.dailySalary} USDC`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  