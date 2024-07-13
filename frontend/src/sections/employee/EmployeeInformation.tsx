'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import WorldID from './WorldID'
import useGetEmployee from '@/hooks/use-get-employee'
import { fetchEmployee } from '@/services/read-services'
import { useState } from 'react'
import { Employee } from '@/state/types'
//import fetch from 'node-fetch'

type Props = {
  address: `0x${string}`
}
export default function EmployeeInformation({ address }: Props) {
  const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined);
  fetchEmployee(address).then((employee) => {
    setEmployeeInfo(employee)
  })

  if (!employeeInfo) {
    return null
  }
  return (
    <div>
      {employeeInfo.}

      <Stack sx={{ width: '60%' }}>
        <div>
        </div>test

      </Stack>


    </div>
  )
}


// import { type BaseError, useReadContract } from 'wagmi'

// function ReadContract() {
//   const { 
//     data: balance,
//     error,
//     isPending
//   } = useReadContract({
//     ...wagmiContractConfig,
//     functionName: 'balanceOf',
//     args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
//   })

//   if (isPending) return <div>Loading...</div>

//   if (error)
//     return (
//       <div>
//         Error: {(error as BaseError).shortMessage || error.message}
//       </div>
//     )

//   return (
//     <div>Balance: {balance?.toString()}</div>
//   )
// }


