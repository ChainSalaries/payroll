async function main() {
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactory and deploy the contract
  const SimplePayroll = await ethers.getContractFactory("SimplePayroll");
  const payroll = await SimplePayroll.deploy();

  await payroll.deployed();

  console.log("SimplePayroll contract deployed to:", payroll.address);

  // Example company and employee addresses (replace with actual addresses)
  const companyAddress = "0x267e99B6a52f9546cD4d498eb77BA986Bd3fB751";
  const employeeAddress = "0xaF30e09cbD25302A725d34985d11a9bA3d811d4b";

  // Register the company
  await payroll.connect(deployer).addCompany("Lemonade Stand Inc.");
  console.log("Company registered:", companyAddress);

  // Register the employee with a daily wage of 0.0001 ETH and activity "Developer"
  const dailyWage = ethers.utils.parseEther("0.0001");
  const activity = "Developer";
  await payroll.connect(deployer).addEmployee(employeeAddress, dailyWage, activity);
  console.log("Employee registered:", employeeAddress);

  // Fund the company's treasury with 0.3 ETH (0.1 ETH for each cycle)
  const totalFundAmount = ethers.utils.parseEther("0.1");
  await payroll.connect(deployer).fundCompany({ value: totalFundAmount });
  console.log("Company's treasury funded with 0.1 ETH");

  // Define the days worked for each cycle
  const daysWorkedPerCycle = [5, 7, 8];

  for (let i = 0; i < daysWorkedPerCycle.length; i++) {
    // Update days worked for the current cycle
    await payroll.connect(deployer).updateDaysWorked(employeeAddress, daysWorkedPerCycle[i]);
    console.log(`Cycle ${i + 1}: Updated days worked for employee: ${daysWorkedPerCycle[i]}`);

    // Payout to the employee for the current cycle
    await payroll.connect(deployer).payout(employeeAddress);
    console.log(`Cycle ${i + 1}: Payout completed for employee: ${employeeAddress}`);
  }
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
