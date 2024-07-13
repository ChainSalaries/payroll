// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Payroll is Ownable {
    uint256 public nextOrgId;
    uint256 public totalEmployees;

    event OrganizationAdded(uint256 orgId, address orgAddress, string orgName);
    event TreasuryFunded(uint256 orgId, uint256 amount);
    event EmployeeAdded(address employeeAccount, address companyAccount, uint256 dailySalaryWei, string activity, uint256 startMoment);
    event EmployeeVerified(address employeeAccount, address companyAccount);
    event EmployeePaid(address employeeAccount, uint256 amount, uint256 latestPayReceived);
    event LatestPayReceivedSetBack(address employeeAccount, uint256 hoursBack);

    constructor() Ownable(msg.sender) {
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
        uint256 dailySalaryWei;
        string activity;
        uint256 startMoment;
        uint256 latestPayReceived;
        uint256[] paymentHistory; // Array to collect all transaction IDs of payOpenBalance
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
        emit OrganizationAdded(nextOrgId, _orgAddress, _orgName); // Emit event
        nextOrgId++;
    }

    function getOrganization(address orgAddress) public view returns (Organization memory) {
        uint256 orgId = organizationIds[orgAddress];
        require(orgId != 0, "Organization does not exist");
        return organizations[orgId];
    }

    function fundOrganizationTreasury(uint256 _orgId) public payable {
        Organization storage org = organizations[_orgId];
        require(org.orgAddress != address(0), "Organization does not exist");
        org.orgTreasury += msg.value;
        emit TreasuryFunded(_orgId, msg.value); // Emit event
    }

    function addEmployee(
        address employeeAccount,
        uint256 dailySalaryWei,
        string memory activity,
        uint256 startMoment
    ) public {
        uint256 orgId = organizationIds[msg.sender];
        Organization storage org = organizations[orgId];

        employees[employeeAccount] = Employee({
            employeeAccount: employeeAccount,
            companyAccount: msg.sender,
            companyName: org.orgName,
            worldcoinVerified: 0, // Default to not verified
            dailySalaryWei: dailySalaryWei,
            activity: activity,
            startMoment: startMoment,
            latestPayReceived: startMoment,
            paymentHistory: new uint256[](0)
        });

        org.employeeAddresses.push(employeeAccount);
        org.employeeCount++;
        totalEmployees++;
        emit EmployeeAdded(employeeAccount, msg.sender, dailySalaryWei, activity, startMoment); // Emit event
    }

    function getEmployee(address employeeAddress) public view returns (
        address employeeAccount,
        address companyAccount,
        string memory companyName,
        uint8 worldcoinVerified,
        uint256 dailySalaryWei,
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
            employee.dailySalaryWei,
            employee.activity,
            employee.startMoment,
            employee.latestPayReceived,
            calculatedOpenBalance
        );
    }

    function getEmployeeHistory(address employeeAddress) public view returns (uint256[] memory) {
        Employee memory employee = employees[employeeAddress];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        return employee.paymentHistory;
    }

    function verifyEmployee(address employeeAccount) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        employee.worldcoinVerified = 1;
        emit EmployeeVerified(employeeAccount, msg.sender); // Emit event
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

        uint256 openBalance = daysElapsed * employee.dailySalaryWei;
        return openBalance;
    }

    function payOpenBalance(address employeeAccount) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 openBalance = calculateOpenBalance(employeeAccount);
        uint256 orgId = organizationIds[employee.companyAccount];
        Organization storage org = organizations[orgId];

        require(address(this).balance >= openBalance, "Insufficient ETH balance in contract");
        // require(org.orgTreasury >= openBalance, "Insufficient funds in organization treasury");

        // Transfer the open balance from the contract to the employee's account
        // payable(employee.employeeAccount).transfer(openBalance);
        (bool sent, ) = employee.employeeAccount.call{value: openBalance}("");
        require(sent, "Failed to send Ether");

        // Update the latest pay received timestamp
        employee.latestPayReceived = block.timestamp;

        // Record the transaction ID in the employee's payment history
        employee.paymentHistory.push(block.timestamp);

        // Deduct the amount from the organization's treasury
        org.orgTreasury -= openBalance;

        emit EmployeePaid(employeeAccount, openBalance, employee.latestPayReceived); // Emit event
    }

    function setLatestPayReceivedBack(address employeeAccount, uint256 hoursBack) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAccount != address(0), "Employee does not exist");

        uint256 secondsBack = hoursBack * 1 hours;
        employee.latestPayReceived -= secondsBack;

        emit LatestPayReceivedSetBack(employeeAccount, hoursBack); // Emit event
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