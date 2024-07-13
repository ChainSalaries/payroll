const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'companyName',
        type: 'string',
      },
    ],
    name: 'CompanyAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'CompanyFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'daysWorked',
        type: 'uint256',
      },
    ],
    name: 'DaysWorkedUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'dailyWageWei',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
    ],
    name: 'EmployeeAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
    ],
    name: 'EmployeeVerified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'PayoutMade',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_companyName',
        type: 'string',
      },
    ],
    name: 'addCompany',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_employeeAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_dailyWageWei',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_activity',
        type: 'string',
      },
    ],
    name: 'addEmployee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'companies',
    outputs: [
      {
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'companyName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'treasury',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'employees',
    outputs: [
      {
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'dailyWageWei',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'daysWorked',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'worldidverified',
        type: 'uint8',
      },
      {
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundCompany',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'companyAddress',
        type: 'address',
      },
    ],
    name: 'getCompany',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'companyAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'companyName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'treasury',
            type: 'uint256',
          },
        ],
        internalType: 'struct SimplePayroll.Company',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'employeeAddress',
        type: 'address',
      },
    ],
    name: 'getEmployee',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'employeeAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'companyAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'dailyWageWei',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'daysWorked',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'worldidverified',
            type: 'uint8',
          },
          {
            internalType: 'string',
            name: 'activity',
            type: 'string',
          },
        ],
        internalType: 'struct SimplePayroll.Employee',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_employeeAddress',
        type: 'address',
      },
    ],
    name: 'payout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_employeeAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_daysWorked',
        type: 'uint256',
      },
    ],
    name: 'updateDaysWorked',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'employeeAccount',
        type: 'address',
      },
    ],
    name: 'verifyEmployee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const

export default abi
