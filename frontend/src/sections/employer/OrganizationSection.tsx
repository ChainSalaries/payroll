'use client'

import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import { Button, Card, CardHeader, Stack, Typography } from '@mui/material'
import { Address, Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'
import moment from 'moment'
import { useBoolean } from '@/hooks/use-boolean'
import AddEmployeeDialog from './AddEmployeeDialog'
import { useEffect, useMemo } from 'react'
import { setOrganization } from '@/state/app'
import { selectOrganization } from '@/state/selectors'
import OrganizationTimeline from './OrganizationTimeLine'
import { EMPLOYEE_ADDS, GET_EMPLOYEES, ORG_ADDED, ORG_FUNDED } from './graph-queries'
import EnsName from '@/components/ens-name'
import { formatEther } from 'viem'
import { paySalary } from '@/services/write-services'

// ----------------------------------------------------------------------
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
    renderCell: (params) => <EnsName address={params.row.address} />,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 120,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 140,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => ` ${formatEther(params.row.salary)}ETH`,
  },
  {
    field: 'verified',
    headerName: 'Verified',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'daysWorked',
    headerName: 'Days Worked',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'pay-action',
    headerName: ' ',
    width: 60,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton
        color="primary"
        onClick={async () => {
          try {
            const tx = await paySalary(params.row.address)
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
        <Iconify icon="ic:outline-payment" />
      </IconButton>
    ),
  },
  {
    field: 'delete-action',
    headerName: ' ',
    width: 60,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton color="error">
        <Iconify icon="ic:outline-delete-forever" />
      </IconButton>
    ),
  },
]

type DataGridProps = {
  data: Employee[]
}

export function EmployeeDataGrid({ data }: DataGridProps) {
  return (
    <DataGrid
      columns={columns}
      rows={data}
      getRowId={(row) => row.address}
      // checkboxSelection
      disableRowSelectionOnClick
    />
  )
}

type Props = {
  address: Address
}

function OrganizationEvents({ address }: Props) {
  const dispatch = useAppDispatch()
  const org = useAppSelector(selectOrganization)

  const { data: employeesAdded } = useQuery(EMPLOYEE_ADDS, {
    variables: {
      companyAddress: address,
    },
  })
  const { data: orgAdded } = useQuery(ORG_ADDED, { variables: { address } })
  const { data: orgFunded } = useQuery(ORG_FUNDED, { variables: { address } })

  const events = useMemo(() => {
    const results = []
    if (orgAdded && orgAdded.companyAddeds?.length) {
      results.push({
        id: orgAdded.companyAddeds[0].id,
        title: 'Organization Created',
        time: orgAdded.companyAddeds[0].blockTimestamp,
        type: 'order1',
      })
    }
    if (orgFunded) {
      for (const funded of orgFunded.companyFundeds) {
        results.push({
          id: funded.id,
          title: `Organization Funded ${formatEther(funded.amount)}ETH`,
          time: funded.blockTimestamp,
          type: 'order2',
        })
      }
    }
    if (employeesAdded) {
      for (const employee of employeesAdded.employeeAddeds) {
        results.push({
          id: employee.id,
          title: 'Employee Added',
          time: employee.blockTimestamp,
          type: 'order3',
        })
      }
    }

    return results.sort((a, b) => b.time - a.time)
  }, [employeesAdded, orgAdded, orgFunded])
  return <OrganizationTimeline title="Events" subheader="the history" list={events} />
}

export default function OrganizationSection({ address }: Props) {
  const dispatch = useAppDispatch()
  const newEmployeeDialog = useBoolean()
  const org = useAppSelector(selectOrganization)

  const { data } = useQuery(GET_EMPLOYEES, {
    variables: {
      companyAddress: address,
    },
  })

  useEffect(() => {
    if (org && data) {
      const employees = data.employees.map(
        (employee: {
          employeeAddress: any
          companyAddress: any
          activity: any
          dailyWageWei: any
          verified: any
          daysWorked: any
        }) => ({
          address: employee.employeeAddress,
          orgAddress: employee.companyAddress,
          activity: employee.activity,
          salary: Number(employee.dailyWageWei),
          verified: employee.verified,
          daysWorked: employee.daysWorked,
        }),
      )
      dispatch(setOrganization({ ...org, employees }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch])

  if (!org) {
    return <Typography textAlign={'center'}>Loading...</Typography>
  }

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Card>
          <CardHeader
            title="Employees"
            sx={{ mb: 2 }}
            action={
              <Button
                variant="contained"
                size="large"
                sx={{ marginLeft: 'auto' }}
                onClick={newEmployeeDialog.onTrue}
              >
                New Employee
              </Button>
            }
          />

          <Box sx={{ height: 390 }}>
            <EmployeeDataGrid data={org.employees ?? []} />
          </Box>
        </Card>
        {org && <OrganizationEvents address={address} />}
      </Stack>
      <AddEmployeeDialog organization={org} dialog={newEmployeeDialog} />
    </>
  )
}
