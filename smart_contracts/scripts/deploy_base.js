// deploy_base.js

async function main() {
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();

  // Address mapping for base-sepolia network
  const addressMapping = {
    "Backend": "0xd669D3CeEb4f573EB6FB172Fd50e4449F0F500F5",
    "Employee1": "0xc8f459883c537fA2F88593836820dA11c526a043",
    "Org1": "0x8Ca16DE2E8A02D9e9Ebc1F893F80C69bad756282",
    "Org2": "0x267e99B6a52f9546cD4d498eb77BA986Bd3fB751",
    "Employee2": "0xaF30e09cbD25302A725d34985d11a9bA3d811d4b",
    "Employee3": "0xf58743E561d6AEe28ee91Da6f91507068b2f1AcF"
  };

  const org2 = addressMapping["Org2"];
  const emp2 = addressMapping["Employee2"];
  const emp3 = addressMapping["Employee3"];

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactory and deploy the contract
  const Payroll = await ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy();

  await payroll.deployed();

  console.log("Payroll contract deployed to:", payroll.address);

  // Add organization Org2
  await payroll.connect(deployer).addOrganization(org2, "Org LLC");

  console.log("Organization added: Org LLC (org2)", org2);

  // Fund organization Org2 with 0.1 ETH
  const initialFundAmount = ethers.utils.parseEther("0.1");
  await deployer.sendTransaction({ to: org2, value: initialFundAmount });

  console.log("Organization Org2 funded with 0.1 ETH");

  // Calculate the daily wage and total wage for 2 months for both employees
  const dailyWage = ethers.utils.parseEther("0.0001");
  const totalWage = dailyWage.mul(60).mul(2); // 0.0001 ETH/day * 60 days * 2 employees
  const additionalFundAmount = ethers.utils.parseEther("0.4"); // Adding extra funds for safety
  const fundAmount = totalWage.add(additionalFundAmount); // Total funds for the organization's treasury

  // Deployer funds the payroll contract's treasury for Org2 with the calculated amount
  await payroll.connect(deployer).fundOrganizationTreasury(1, { value: fundAmount });

  console.log("Organization Org2's treasury funded with:", fundAmount.toString(), "ETH");

  // Register employees emp2 and emp3 with Org LLC
  const startMoment = Math.floor(Date.now() / 1000);

  await payroll.connect(deployer).addEmployee(emp2, dailyWage, "Developer", startMoment);
  await payroll.connect(deployer).addEmployee(emp3, dailyWage, "Designer", startMoment);

  console.log("Employees emp2 and emp3 added to Org LLC with a daily wage of 0.0001 ETH");

  // Set the latest pay received back by 2 months (60 days) for emp2 and emp3
  const hoursBack = 60 * 24;
  await payroll.connect(deployer).setLatestPayReceivedBack(emp2, hoursBack);
  await payroll.connect(deployer).setLatestPayReceivedBack(emp3, hoursBack);

  console.log("Set latest pay received back by 2 months for emp2 and emp3");

  // Log the treasury balance before making payments
  const orgDetailsBeforePayment = await payroll.getFullOrganizationDetails(org2);
  console.log("Org2 treasury balance before payments:", ethers.utils.formatEther(orgDetailsBeforePayment.balance));

  // Debug info for payments
  const emp2OpenBalance = await payroll.calculateOpenBalance(emp2);
  const emp3OpenBalance = await payroll.calculateOpenBalance(emp3);
  console.log(`emp2 Open Balance: ${ethers.utils.formatEther(emp2OpenBalance)} ETH`);
  console.log(`emp3 Open Balance: ${ethers.utils.formatEther(emp3OpenBalance)} ETH`);

  // Check the total required balance for payments
  const totalRequired = emp2OpenBalance.add(emp3OpenBalance).mul(2); // Two payments for each employee
  console.log(`Total required for payments: ${ethers.utils.formatEther(totalRequired)} ETH`);

  // Ensure the treasury has enough funds before making payments
  const orgDetails = await payroll.getFullOrganizationDetails(org2);
  const orgTreasuryBalance = ethers.BigNumber.from(orgDetails.balance);
  console.log(`Org2 treasury balance available: ${ethers.utils.formatEther(orgTreasuryBalance)} ETH`);

  if (orgTreasuryBalance.lt(totalRequired)) {
    throw new Error("Insufficient funds in organization treasury for payments");
  }

  // Perform 2 payments for emp2 and emp3 to build up a history
  for (let i = 0; i < 2; i++) {
    console.log(`Payment ${i + 1} for emp2 and emp3`);
    await payroll.connect(deployer).payOpenBalance(emp2);
    await payroll.connect(deployer).payOpenBalance(emp3);
  }

  console.log("Completed 2 payments for emp2 and emp3");

  // Log the treasury balance after making payments
  const orgDetailsAfterPayment = await payroll.getFullOrganizationDetails(org2);
  console.log("Org2 treasury balance after payments:", ethers.utils.formatEther(orgDetailsAfterPayment.balance));
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  