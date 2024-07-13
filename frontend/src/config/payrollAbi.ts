const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'usdcAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'employeeAccount',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'dailySalaryUSDC',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startMoment',
        type: 'uint256',
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
        name: '_orgAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_orgName',
        type: 'string',
      },
    ],
    name: 'addOrganization',
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
    name: 'calculateOpenBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
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
        name: 'employeeAccount',
        type: 'address',
      },
    ],
    name: 'calculateTimeDiff',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
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
        name: 'employeeAccount',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'companyAccount',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'companyName',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'worldcoinVerified',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'dailySalaryUSDC',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startMoment',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'latestPayReceived',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_orgId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'fundOrganizationTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'address',
        name: 'employeeAccount',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'companyAccount',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'companyName',
        type: 'string',
      },
      {
        internalType: 'uint8',
        name: 'worldcoinVerified',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'dailySalaryUSDC',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'activity',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startMoment',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'latestPayReceived',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'openBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
    ],
    name: 'getEmployeesByOrganization',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
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
        name: 'orgAddress',
        type: 'address',
      },
    ],
    name: 'getFullOrganizationDetails',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'employeeAccount',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'companyAccount',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'companyName',
            type: 'string',
          },
          {
            internalType: 'uint8',
            name: 'worldcoinVerified',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'dailySalaryUSDC',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'activity',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startMoment',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'latestPayReceived',
            type: 'uint256',
          },
        ],
        internalType: 'struct Payroll.Employee[]',
        name: 'employeesList',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'openBalances',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'orgAddress',
        type: 'address',
      },
    ],
    name: 'getOrganization',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'orgAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'orgId',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'orgName',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'orgTreasury',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'employeeCount',
            type: 'uint256',
          },
          {
            internalType: 'address[]',
            name: 'employeeAddresses',
            type: 'address[]',
          },
        ],
        internalType: 'struct Payroll.Organization',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalEmployees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextOrgId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
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
    name: 'organizationIds',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'organizations',
    outputs: [
      {
        internalType: 'address',
        name: 'orgAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'orgName',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'orgTreasury',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'employeeCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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
    name: 'payOpenBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
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
      {
        internalType: 'uint256',
        name: 'hoursBack',
        type: 'uint256',
      },
    ],
    name: 'setLatestPayReceivedBack',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalEmployees',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
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
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usdc',
    outputs: [
      {
        internalType: 'contract IUSDC',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
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