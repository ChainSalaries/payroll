import { useAccount, useReadContracts, useBalance } from 'wagmi'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'
import { readContract } from '@wagmi/core'
import { config } from '@/config'

// Deploying contracts with the account: 0xd669D3CeEb4f573EB6FB172Fd50e4449F0F500F5
// Account balance: 10000000000000000
// USDC deployed to: 0xBDcC2938F553486FeA77842e3168386dd5060e4e
// Payroll deployed to: 0xAEf0EF43a5df13AC8c4Ce552f9ca3dB4FDd72ee6
// /Users/yangjunwang/src/eth-global/payroll-frontend/thegraph/payrollAbi.json

const useGetBalances = () => {
  const { address } = useAccount()

  const { data, isLoading, isSuccess, refetch } = readContract(config, {
    chainId: baseSepolia.id,
    address,
  })

  const contracts = ERC20Tokens.map((token) => ({
    address: token.address,
    abi: payrollAbi,
    functionName: 'balanceOf',
    args: ['0xbd19a3f0a9cace18513a1e2863d648d13975cb30'],
  }))

  const { data, isLoading, isSuccess, refetch } = useReadContracts({
    allowFailure: false,
    contracts,
  })

  return { data, isLoading, isSuccess, refetch }
}

export default useGetBalances
