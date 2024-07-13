'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Paper } from '@mui/material'

import WorldID from './WorldID'
import { fetchEmployee } from '@/services/read-services'
import { useState } from 'react'
import { Employee } from '@/state/types'
import moment from 'moment'
import { formatEther } from 'viem'
import Iconify from '@/components/iconify'
import EnsName from '@/components/ens-name'
//import fetch from 'node-fetch'

type Props = {
  address: `0x${string}`
}
export default function EmployeeInformation({ address }: Props) {
  //const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined);
  const employeeInfo = {
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    orgAddress: '0xabcdef',
    verified: false,
    salary: 100000000000,
    activity: 'Developer',
    daysWorked: 32,
  } as Employee

  // fetchEmployee(address).then((employee) => {
  //   //setEmployeeInfo(employee)
  // })

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
                      boxShadow: 5,
                    }}
                    alt="The house from the offer."
                    src="https://c8.alamy.com/comp/2HWB4X9/bored-ape-yacht-club-nft-artwork-trippy-color-ape-with-gradient-background-crypto-graphic-asset-flat-vector-illustration-2HWB4X9.jpg"
                  />
                </Paper>
                <div>
                  <p className="ensName">
                    <EnsName address={employeeInfo.address} />
                  </p>
                </div>
                <div>{address.substring(0, 15)}...</div>
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
                      <li>{moment.unix(employeeInfo.daysWorked).format('MMMM Do YYYY')}</li>
                      <li>{employeeInfo.activity}</li>
                      <li>{formatEther(BigInt(employeeInfo.salary))} Ξ</li>
                      <li>{employeeInfo.verified ? 'Verified' : 'Not verified'}</li>
                    </ul>
                  </div>
                </div>
                <div className="worldIdButton">
                  <WorldID address={address} />
                </div>
                <div className="totalBalance">
                  <p className="balancep">
                    Balance: <span className="value">1.25 Ξ</span>
                  </p>
                  <Button
                    style={{ minWidth: '200px', minHeight: '35px' }}
                    variant="contained"
                    color="success"
                  >
                    <Iconify icon="tabler:world" />
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  )
}
