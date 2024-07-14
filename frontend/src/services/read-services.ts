import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContracts, readContract } from '@wagmi/core'
import { config } from '@/config'
import { Address, Employee, Organization } from '@/state/types'
import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'

export async function fetchEmployees(employeeAddresses: readonly `0x${string}`[]) {
  const results = await readContracts(config, {
    contracts: employeeAddresses.map((employeeAddress) => ({
      chainId: baseSepolia.id,
      abi: payrollAbi,
      functionName: 'getEmployee',
      args: [employeeAddress],
      address: PAYROLL_CONTRACT_ADDRESS,
    })),
  })
  console.log('fetchEmployees', results)

  return results
    .filter((result) => result.status === 'success')
    .map((result) => {
      const r = result.result as any

      return {
        address: r[0],
        orgAddress: r[1],
        verified: Boolean(r[3]),
        salary: Number(r[4]),
        activity: r[5],
        daysWorked: Number(r[6]),
        latestPayReceived: Number(r[7]),
        openBalance: Number(r[8]),
      } as Employee
    })
}

export async function fetchEmployee(address: `0x${string}`) {
  console.log('fetch', address)

  const result = await readContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getEmployee',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  console.log('fetchEmployee', result)
  return {
    address: result.employeeAddress,
    orgAddress: result.companyAddress,
    salary: Number(result.dailyWageWei),
    verified: Boolean(result.worldidverified),
    activity: result.activity,
    daysWorked: Number(result.daysWorked),
  } as Employee
}

export async function fetchOrganization(address: Address) {
  const result = await readContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getCompany',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  return {
    orgAddress: result.companyAddress,
    orgName: result.companyName,
    orgTreasury: Number(result.treasury),
  } as Organization
}
