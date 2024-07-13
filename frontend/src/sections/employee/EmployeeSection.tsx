'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import WorldID from './WorldID'
//import fetch from 'node-fetch'

export default function VerifyWorldID() {
  const dispatch = useAppDispatch()
  const { address, isConnecting, isDisconnected } = useAccount()
  console.log("address: " + address)

  return (
    <div>
      <Stack sx={{ width: '100%' }}>
        <Typography textAlign={'center'} variant="h2">
          Welcome, PERSON
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            gap: 2,
            width: '100%',
            borderRadius: 1,
          }}
        >
          <WorldID
            address={address}
          />
        </Box>
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


