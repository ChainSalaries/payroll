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
import { paySalary } from '@/services/write-services'
import { toast } from 'react-toastify'
import { useEnsAvatar } from 'wagmi'
import { normalize } from 'viem/ens'
//import fetch from 'node-fetch'

import { getEnsName } from '@wagmi/core'
import { sepolia } from 'wagmi/chains'
import { config } from '@/config'


type Props = {
  address: `0x${string}`
}
export default function EmployeeInformation({ address }: Props) {
  const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined);
  const [ensName, setEnsName] = useState<string>('')
  const [employeeAvatar, setEmployeeAvatar] = useState<string>("")
  console.log("hahaaa")
  getEnsName(config, {
    chainId: sepolia.id,
    address,
  }).then((ensName) => {
    if (!ensName) {
      return
    }
    setEnsName(ensName)
  })

  const { data, isError, isLoading } = useEnsAvatar({
    name: ensName,
  })


  fetchEmployee(address).then((employee) => {
    setEmployeeInfo(employee)
    console.log(employee)
  })

  const timeSeconds = Date.now() / 1000

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
                    src={data ? data : "/loading.webp"}
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
                      <li>🗓️ Days worked:</li>
                      <li>💰 Day Wage:</li>
                      <li>⚙️ Activity:</li>
                      <li>🌎 World ID:</li>
                    </ul>
                  </div>
                  <div className="employeeDataValues">
                    <ul className="employeeDataValues">
                      <li>{employeeInfo.daysWorked}</li>
                      <li>{formatEther(BigInt(employeeInfo.salary))} Ξ</li>
                      <li>{employeeInfo.activity}</li>
                      <li>{employeeInfo.verified ? 'Verified' : 'Not verified'}</li>
                    </ul>
                  </div>
                </div>
                <div className="worldIdButton">
                  <WorldID address={address} />
                </div>
                <div className="totalBalance">
                  <p className="balancep">
                    Balance: <span className="value">{formatEther(BigInt(employeeInfo.daysWorked * employeeInfo.salary))} Ξ</span>
                  </p>
                  <Button
                    style={{ minWidth: '200px', minHeight: '35px' }}
                    variant="contained"
                    color="success"
                    disabled={!employeeInfo.verified}
                    onClick={async () => {
                      try {
                        const tx = await paySalary(address)
                        toast.success(`🦄 salary payment transaction submitted! transaction: ${tx}`)
                      } catch (error) {
                        console.error(error)
                        // toast.error(`Payment failed: ${error}`, {
                        //   position: 'top-right',
                        //   autoClose: 5000,
                        //   hideProgressBar: false,
                        //   closeOnClick: true,
                        //   pauseOnHover: true,
                        //   draggable: true,
                        //   progress: undefined,
                        //   theme: 'light',
                        // })
                      }
                    }}
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
