// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimplePayroll {
    struct Company {
        address companyAddress;
        string companyName;
        uint256 treasury;
    }

    struct Employee {
        address employeeAddress;
        address companyAddress;
        uint256 dailyWage;
        uint256 daysWorked;
        uint8 worldidverified;
    }

    mapping(address => Company) public companies;
    mapping(address => Employee) public employees;

    event CompanyAdded(address indexed companyAddress, string companyName);
    event CompanyFunded(address indexed companyAddress, uint256 amount);
    event EmployeeAdded(address indexed employeeAddress, address indexed companyAddress);
    event DaysWorkedUpdated(address indexed employeeAddress, uint256 daysWorked);
    event PayoutMade(address indexed employeeAddress, uint256 amount);
    event EmployeeVerified(address indexed employeeAddress);

    function addCompany(string memory _companyName) public {
        companies[msg.sender] = Company({
            companyAddress: msg.sender,
            companyName: _companyName,
            treasury: 0
        });
        emit CompanyAdded(msg.sender, _companyName);
    }

    function fundCompany() public payable {
        Company storage company = companies[msg.sender];
        company.treasury += msg.value;
        emit CompanyFunded(msg.sender, msg.value);
    }

    function addEmployee(address _employeeAddress) public {
        employees[_employeeAddress] = Employee({
            employeeAddress: _employeeAddress,
            companyAddress: msg.sender,
            dailyWage: 0.0001 ether,
            daysWorked: 0,
            worldidverified: 0
        });
        emit EmployeeAdded(_employeeAddress, msg.sender);
    }

    function updateDaysWorked(address _employeeAddress, uint256 _daysWorked) public {
        Employee storage employee = employees[_employeeAddress];
        employee.daysWorked = _daysWorked;
        emit DaysWorkedUpdated(_employeeAddress, _daysWorked);
    }

    function payout(address _employeeAddress) public {
        Employee storage employee = employees[_employeeAddress];
        Company storage company = companies[employee.companyAddress];

        uint256 payoutAmount = employee.daysWorked * employee.dailyWage;

        require(company.treasury >= payoutAmount, "Insufficient funds in company treasury");
        require(address(this).balance >= payoutAmount, "Insufficient ETH balance in contract");

        employee.daysWorked = 0;
        company.treasury -= payoutAmount;
        payable(employee.employeeAddress).transfer(payoutAmount);
        emit PayoutMade(_employeeAddress, payoutAmount);
    }

    function verifyEmployee(address employeeAccount) public {
        Employee storage employee = employees[employeeAccount];
        require(employee.employeeAddress != address(0), "Employee does not exist");

        employee.worldidverified = 1;
        emit EmployeeVerified(employeeAccount);
    }

    // Add receive function to accept Ether
    receive() external payable {}

    // Function to get the details of a company
    function getCompany(address companyAddress) public view returns (Company memory) {
        return companies[companyAddress];
    }

    // Function to get the details of an employee
    function getEmployee(address employeeAddress) public view returns (Employee memory) {
        return employees[employeeAddress];
    }
}
