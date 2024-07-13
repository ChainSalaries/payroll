// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IUSDC {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract Payroll is Ownable {
    IUSDC public usdc;
    uint256 public nextOrgId;
    uint256 public totalEmployees;

    constructor(address usdcAddress) Ownable(msg.sender) {
        usdc = IUSDC(usdcAddress);
        nextOrgId = 1;
        totalEmployees = 0;
    }

    struct Organization {
        address orgAddress;
        uint256 orgId;
        string orgName;
        uint256 orgTreasury;
        uint256 employeeCount; // Track number of employees per organization
        address[] employeeAddresses; // Array of employee addresses
    }

    struct Employee {
        address employeeAccount;
        address companyAccount;
        string companyName;
        uint8 worldcoinVerified;
        uint256 dailySalaryUSDC;
        string activity;
        uint256 startMoment;
        uint256 latestPayReceived;
    }

    mapping(uint256 => Organization) public organizations;
    mapping(address => Employee) public employees;
    mapping(address => uint256) public organizationIds; // Map organization addresses to their IDs

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function addOrganization(address _orgAddress, string memory _orgName) public {
        require(organizationIds[_orgAddress] == 0, "Organization already exists");
        organizations[nextOrgId] = Organization({
            orgAddress: _orgAddress,
            orgId: nextOrgId,
            orgName: _orgName,
            orgTreasury: 0,
            employeeCount: 0,
            employeeAddresses: new address[](0)
        });
        organizationIds[_orgAddress] = nextOrgId;
        nextOrgId++;
    }

    function getOrganization(address orgAddress) public view returns (Organization memory) {
        uint256 orgId = organizationIds[orgAddress];
        require(orgId != 0, "Organization does not exist");
        return organizations[orgId];
    }

    function fundOrganizationTreasury(uint256 _orgId, uint256 amount) public {
        Organization storage org = organizations[_orgId];
        require(org.orgAddress != address(0), "Organization does not exist");
        require(usdc.balanceOf(org.orgAddress) >= amount, "Insufficient USDC balance in organization account");

        usdc.transferFrom(org.orgAddress, address(this), amount);
        org.orgTreasury += amount;
    }

    function addEmployee(
        address employeeAccount,
        uint256 dailySalaryUSDC,
        string memory activity,
        uint256 startMoment
    ) public {
        uint256 orgId = organizationIds[msg.sender];
        Organization storage org = organizations[orgId];
        require(org.orgAddress == msg.sender, "Only the organization can add an employee");

        employees[employeeAccount] = Employee({
            employeeAccount: employeeAccount,
            companyAccount: msg.sender,
            companyName: org.orgName,
            worldcoinVerified: 0, // Default to not verified
            dailySalaryUSDC: dailySalaryUSDC,
            activity: activity,
            startMoment: startMoment,
            latestPayReceived: startMoment
        });        

        org.employeeAddresses.push(employeeAccount);
        org.employeeCount++;
        totalEmployees++;
    }

    function getEmployee(address employeeAddress) public view returns (
        address employeeAccount,
        address companyAccount,
        string memory companyName,
        uint8 worldcoinVerified,
        uint256 dailySalaryUSDC,
        string memory activity,
        uint256 startMoment,
        uint256 latestPayReceived,
        uint256 openBalance
    ) {
        Employee memory employee = employees[employeeAddress];
        require(employee.employeeAccount != address(0), "Employee does not exist");
        
        uint256 calculatedOpenBalance = calculateOpenBalance(employeeAddress);
        
        return (
            employee.employeeAccount,
            employee.companyAccount,
            employee.companyName,
            employee.worldcoinVerified,
            employee.dailySalaryUSDC,
            employee.activity,
            employee.startMoment,
            employee.latestPayReceived,
            calculatedOpenBalance
        );
    }

    function verifyEmployee(address employeeAccount) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");
        require(employee.companyAccount == msg.sender, "Only the company can verify the employee");

        employee.worldcoinVerified = 1;
    }

    function getTotalEmployees() public view returns (uint256) {
        return totalEmployees;
    }

    function getEmployeesByOrganization(uint256 orgId) public view returns (uint256) {
        return organizations[orgId].employeeCount;
    }

    function calculateTimeDiff(address employeeAccount) public view returns (uint256) {
        Employee memory employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 currentTime = block.timestamp;
        uint256 latestPayTime = employee.latestPayReceived;

        uint256 timeDiff = currentTime - latestPayTime;

        return timeDiff;
    }

    function calculateOpenBalance(address employeeAccount) public view returns (uint256) {
        Employee memory employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 currentTime = block.timestamp;
        uint256 latestPayTime = employee.latestPayReceived;

        if (currentTime <= latestPayTime) {
            return 0;
        }

        uint256 daysElapsed = (currentTime - latestPayTime) / 1 days;
        if (daysElapsed < 1) {
            return 0;
        }

        uint256 openBalance = daysElapsed * employee.dailySalaryUSDC;
        return openBalance;
    }

    function payOpenBalance(address employeeAccount) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 openBalance = calculateOpenBalance(employeeAccount);
        uint256 orgId = organizationIds[employee.companyAccount];
        Organization storage org = organizations[orgId];

        require(usdc.balanceOf(employee.companyAccount) >= openBalance, "Insufficient USDC balance in company account");
        require(usdc.allowance(employee.companyAccount, address(this)) >= openBalance, "Insufficient allowance for payroll contract");
        require(org.orgTreasury >= openBalance, "Insufficient funds in organization treasury");

        // Transfer the open balance from the company's account to the employee's account
        usdc.transferFrom(employee.companyAccount, employee.employeeAccount, openBalance);

        // Update the latest pay received timestamp
        employee.latestPayReceived = block.timestamp;

        // Deduct the amount from the organization's treasury
        org.orgTreasury -= openBalance;
    }

    function setLatestPayReceivedBack(address employeeAccount, uint256 hoursBack) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 secondsBack = hoursBack * 1 hours;
        employee.latestPayReceived -= secondsBack;
    }

    function getFullOrganizationDetails(address orgAddress) public view returns (
        string memory name,
        uint256 id,
        uint256 balance,
        Employee[] memory employeesList,
        uint256[] memory openBalances
    ) {
        uint256 orgId = organizationIds[orgAddress];
        Organization storage org = organizations[orgId];
        require(org.orgAddress != address(0), "Organization does not exist");

        Employee[] memory employeesArray = new Employee[](org.employeeCount);
        uint256[] memory openBalancesArray = new uint256[](org.employeeCount);
        for (uint256 i = 0; i < org.employeeCount; i++) {
            address employeeAddress = org.employeeAddresses[i];
            employeesArray[i] = employees[employeeAddress];
            openBalancesArray[i] = calculateOpenBalance(employeeAddress);
        }

        return (org.orgName, org.orgId, org.orgTreasury, employeesArray, openBalancesArray);
    }
}
