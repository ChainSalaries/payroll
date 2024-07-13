'use client'

import { useAppDispatch, useAppSelector } from '@/state/hooks'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import { Button, Card, CardHeader, Stack, Typography } from '@mui/material'
import { Address, Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'
import moment from 'moment' // Add this line to import the 'moment' library
import { useBoolean } from '@/hooks/use-boolean'
import AddEmployeeDialog from './AddEmployeeDialog'
import useGetOrganization from '@/hooks/use-get-organization'
import { useEffect, useMemo } from 'react'
import { setOrganization } from '@/state/app'
import { fetchEmployees } from '@/services/read-services'
import { selectOrganization } from '@/state/selectors'
import OrganizationTimeline from './OrganizationTimeLine'
import { GET_EMPLOYEES, ORG_ADDED, ORG_FUNDED } from './graph-queries'
import EnsName from '@/components/ens-name'
import { formatEther } from 'viem'

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
    renderCell: (params) => formatEther(params.row.salary),
  },
  {
    field: 'verified',
    headerName: 'Verified',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'startMoment',
    headerName: 'Joined',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => moment.unix(params.row.startMoment).format('YYYY-MM-DD'),
  },
  {
    field: 'pay-action',
    headerName: ' ',
    width: 60,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton color="primary">
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

export default function OrganizationSection({ address }: Props) {
  const dispatch = useAppDispatch()
  const newEmployeeDialog = useBoolean()
  const org = useAppSelector(selectOrganization)
  const { data, refetch } = useGetOrganization(address)

  const { data: employeesAdded } = useQuery(GET_EMPLOYEES, {
    variables: {
      companyAccount: org?.orgAddress,
    },
  })
  const { data: orgAdded } = useQuery(ORG_ADDED, { variables: { orgId: org?.orgId } })
  const { data: orgFunded } = useQuery(ORG_FUNDED, { variables: { orgId: org?.orgId } })

  const events = useMemo(() => {
    const results = []
    if (orgAdded) {
      results.push({
        id: orgAdded.organizationAddeds[0].id,
        title: 'Organization Created',
        time: orgAdded.organizationAddeds[0].blockTimestamp,
        type: 'order1',
      })
    }
    if (orgFunded) {
      for (const funded of orgFunded.treasuryFundeds) {
        results.push({
          id: funded.id,
          title: 'Organization Funded',
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

  useEffect(() => {
    if (data) {
      const updatedOrg: Organization = {
        orgAddress: data.companyAddress,
        orgName: data.companyName,
        orgTreasury: Number(data.treasury),
        employees: org?.employees,
      }

      dispatch(setOrganization(updatedOrg))
      fetchEmployees(data.employeeAddresses).then((employees) => {
        console.log('employees', employees)
        dispatch(setOrganization({ ...updatedOrg, employees }))
      })
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
            title="Employee"
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
        <OrganizationTimeline title="Events" subheader="the history" list={events} />
      </Stack>
      <AddEmployeeDialog organization={org} dialog={newEmployeeDialog} />
    </>
  )
}
