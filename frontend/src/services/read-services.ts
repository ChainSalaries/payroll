import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContracts, readContract } from '@wagmi/core'
import { config } from '@/config'
import { Employee } from '@/state/types'
import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'

export async function fetchEmployees(employeeAddresses: readonly `0x${string}`[]) {
  const results = await readContracts(config, {
    contracts: employeeAddresses.map((employeeAddress) => ({
      chainId: baseSepolia.id,
      abi: payrollAbi,
      functionName: 'getEmployee',
      args: [employeeAddress],
      address: '0xAEf0EF43a5df13AC8c4Ce552f9ca3dB4FDd72ee6',
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
        startMoment: Number(r[6]),
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
    address: result[0],
    orgAddress: result[1],
    verified: Boolean(result[3]),
    salary: Number(result[4]),
    activity: result[5],
    startMoment: Number(result[6]),
    latestPayReceived: Number(result[7]),
    openBalance: Number(result[8]),
  } as Employee
}
