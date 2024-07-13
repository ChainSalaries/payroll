// deploy.js

async function main() {
  // Get the deployer's account and other signers from Hardhat
  const [deployer, backendSigner, emp1Signer, org1Signer, org2Signer, emp2Signer, emp3Signer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactory and deploy the contract
  const Payroll = await ethers.getContractFactory("Payroll");
  const payroll = await Payroll.deploy();

  await payroll.deployed();

  console.log("Payroll contract deployed to:", payroll.address);

  // Add organization Org2
  await payroll.connect(deployer).addOrganization(org2Signer.address, "Org LLC");

  console.log("Organization added: Org LLC (org2)", org2Signer.address);

  // Fund organization Org2 with 0.1 ETH
  const initialFundAmount = ethers.utils.parseEther("0.1");
  await deployer.sendTransaction({ to: org2Signer.address, value: initialFundAmount });

  console.log("Organization Org2 funded with 0.1 ETH");

  // Calculate the total wage for 2 months for both employees
  const dailyWage = ethers.utils.parseEther("0.001");
  const totalWage = dailyWage.mul(60).mul(2); // 0.001 ETH/day * 60 days * 2 employees
  const additionalFundAmount = ethers.utils.parseEther("0.1"); // Adding extra funds for safety
  const fundAmount = totalWage.add(additionalFundAmount); // Total funds for the organization's treasury

  // Deployer funds the payroll contract's treasury for Org2 with the calculated amount
  await payroll.connect(deployer).fundOrganizationTreasury(1, { value: fundAmount });

  console.log("Organization Org2's treasury funded with:", fundAmount.toString(), "ETH");

  // Register employees emp2 and emp3 with Org LLC
  const startMoment = Math.floor(Date.now() / 1000);

  await payroll.connect(org2Signer).addEmployee(emp2Signer.address, dailyWage, "Developer", startMoment);
  await payroll.connect(org2Signer).addEmployee(emp3Signer.address, dailyWage, "Designer", startMoment);

  console.log("Employees emp2 and emp3 added to Org LLC with a daily wage of 0.001 ETH");

  // Set the latest pay received back by 2 months (60 days) for emp2 and emp3
  const hoursBack = 60 * 24;
  await payroll.connect(deployer).setLatestPayReceivedBack(emp2Signer.address, hoursBack);
  await payroll.connect(deployer).setLatestPayReceivedBack(emp3Signer.address, hoursBack);

  console.log("Set latest pay received back by 2 months for emp2 and emp3");

  // Log the treasury balance before making payments
  const orgDetailsBeforePayment = await payroll.getFullOrganizationDetails(org2Signer.address);
  console.log("Org2 treasury balance before payments:", ethers.utils.formatEther(orgDetailsBeforePayment.balance));

  // Perform 2 payments for emp2 and emp3 to build up a history
  for (let i = 0; i < 2; i++) {
    await payroll.connect(org2Signer).payOpenBalance(emp2Signer.address);
    await payroll.connect(org2Signer).payOpenBalance(emp3Signer.address);
  }

  console.log("Completed 2 payments for emp2 and emp3");

  // Log the treasury balance after making payments
  const orgDetailsAfterPayment = await payroll.getFullOrganizationDetails(org2Signer.address);
  console.log("Org2 treasury balance after payments:", ethers.utils.formatEther(orgDetailsAfterPayment.balance));
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
  