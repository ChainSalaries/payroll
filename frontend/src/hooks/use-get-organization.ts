import { useReadContract } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants'

const useGetOrganization = (address: `0x${string}`) => {
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    chainId: baseSepolia.id,
    abi: payrollAbi,
    functionName: 'getCompany',
    args: [address],
    address: PAYROLL_CONTRACT_ADDRESS,
  })

  console.log('useGetOrganization', data, isLoading, isSuccess)
  return { data, isLoading, isSuccess, refetch }
}

export default useGetOrganization
