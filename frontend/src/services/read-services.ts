import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContracts } from '@wagmi/core'
import { config } from '@/config'
import { Employee } from '@/state/types'

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
