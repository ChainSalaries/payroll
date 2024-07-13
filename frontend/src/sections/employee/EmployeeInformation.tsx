'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import styles from './styles.module.css'
import { Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'

import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import WorldID from './WorldID'
import useGetEmployee from '@/hooks/use-get-employee'
import { fetchEmployee } from '@/services/read-services'
import { useState } from 'react'
import { Employee } from '@/state/types'
import moment from 'moment'
import { formatEther } from 'viem'
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
      <div className="employeeContainer">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 'auto',
            '& > :not(style)': {
              m: 1,
              width: 1000,
              height: 300,
            },
          }}
        >
          <Paper elevation={24}>
            <div className="paper">
              <div className="employeeUserSide">
                <Paper elevation={24}>
                  <Box
                    component="img"
                    sx={{
                      height: 200,
                      width: 200,
                      boxShadow: 5
                    }}
                    alt="The house from the offer."
                    src="https://c8.alamy.com/comp/2HWB4X9/bored-ape-yacht-club-nft-artwork-trippy-color-ape-with-gradient-background-crypto-graphic-asset-flat-vector-illustration-2HWB4X9.jpg"
                  />
                </Paper>
                <div>Lensname</div>
                <div>{address.substring(0, 10)}...</div>

              </div>
              <div className="employeeDataSide">
                <div className="employeeData">
                  <div className="employeeDataLabels">
                    <ul className="employeeDataLabels">
                      <li>🗓️ Start date:</li>
                      <li>⚙️ Activity:</li>
                      <li>💰 Salary:</li>
                      <li>🌎 World ID:</li>
                    </ul>
                  </div>
                  <div className="employeeDataValues">
                    <ul className="employeeDataValues">
                      <li>{moment.unix(employeeInfo.startMoment).format('MMMM Do YYYY')}</li>
                      <li>{employeeInfo.activity}</li>
                      <li>{formatEther(BigInt(employeeInfo.salary))} Ξ</li>
                      <li>{employeeInfo.verified ? "Verified" : "Not verified"}</li>
                    </ul>
                  </div>
                </div>
                <div className="worldIdButton">
                  <WorldID
                    address={address}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div >
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


