import { useAccount, useBalance } from 'wagmi';
import { mainnet } from 'viem/chains';

const useGetBalances = () => {
  const { address } = useAccount();

  const { data, isLoading, isSuccess, refetch } = useBalance({
    chainId: mainnet.id,
    address,
  });

  return { data, isLoading, isSuccess, refetch };
};

export default useGetBalances;
