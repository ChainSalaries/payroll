import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { writeContract } from '@wagmi/core'
import { config } from '@/config'
import { Address } from '@/state/types'

export async function addNewEmployee(address: Address, salary: number, activity: string) {
  const result = await writeContract(config, {
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'addEmployee',
    args: [address, BigInt(salary), activity, BigInt(Date.now())],
    address: '0xAEf0EF43a5df13AC8c4Ce552f9ca3dB4FDd72ee6',
  })
  console.log('add new Employee transaction', result)
  return result
}
