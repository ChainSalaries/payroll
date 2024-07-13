import { useAccount, useReadContract, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'
import { fetchEmployees } from '@/services/read-services'

const useGetOrganization = (address: `0x${string}`) => {
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getOrganization',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  console.log('result', data, isLoading, isSuccess)
  return { data, isLoading, isSuccess, refetch }
}

export default useGetOrganization
