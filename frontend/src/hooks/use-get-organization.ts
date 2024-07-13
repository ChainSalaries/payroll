import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContracts } from '@wagmi/core'
import { config } from '@/config'

const useGetOrganization = (address: `0x${string}`) => {
  console.log('useGetOrganization', address)

  const { data, isLoading, isSuccess, refetch } = useReadContract({
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getOrganization',
    args: [address],
    address: '0xAEf0EF43a5df13AC8c4Ce552f9ca3dB4FDd72ee6',
  })

  async function fetchEmployees(employeeAddresses: readonly `0x${string}`[]) {
    const results = await readContracts(config, {
      contracts: employeeAddresses.map((employeeAddress) => ({
        chainId: baseSepolia.id,
        abi: payrollAbi,
        functionName: 'getEmployee',
        args: [employeeAddress],
        address: '0xAEf0EF43a5df13AC8c4Ce552f9ca3dB4FDd72ee6',
      })),
    })
  }
  if (isSuccess && data.employeeAddresses.length > 0) {
    fetchEmployees(data.employeeAddresses)
  }

  console.log('result', data, isLoading, isSuccess)

  return { data, isLoading, isSuccess, refetch }
}

export default useGetOrganization
