'use client'

import { useAppDispatch, useAppSelector } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Card, CardHeader, Stack, TextField, Typography } from '@mui/material'
import { Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'
import moment from 'moment' // Add this line to import the 'moment' library
import { useBoolean } from '@/hooks/use-boolean'
import AddEmployeeDialog from './AddEmployeeDialog'
import useGetOrganization from '@/hooks/use-get-organization'
import { useEffect } from 'react'
import { setOrganization } from '@/state/app'
import { fetchEmployees } from '@/services/read-services'
import { selectOrganization } from '@/state/selectors'

// ----------------------------------------------------------------------
const columns: GridColDef[] = [
  {
    field: 'address',
    headerName: 'ID',
    width: 120,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
    editable: true,
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
    width: 60,
    editable: true,
    align: 'center',
    headerAlign: 'center',
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

export function DataGridBasic({ data }: DataGridProps) {
  console.log('grid data', data)
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
  address: `0x${string}`
}

export default function OrganizationSection({ address }: Props) {
  const dispatch = useAppDispatch()
  const newEmployeeDialog = useBoolean()
  const org = useAppSelector(selectOrganization)
  const { data, refetch } = useGetOrganization(address)

  useEffect(() => {
    if (data) {
      const updatedOrg: Organization = {
        orgAddress: data.orgAddress,
        orgId: Number(data.orgId),
        orgName: data.orgName,
        orgTreasury: Number(data.orgTreasury),
        employeeCount: Number(data.employeeCount),
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
        <Box display="flex" alignItems="end">
          <Button
            variant="contained"
            size="large"
            sx={{ marginLeft: 'auto' }}
            onClick={newEmployeeDialog.onTrue}
          >
            New Employee
          </Button>
        </Box>
        <Card>
          <CardHeader title="Employee" sx={{ mb: 2 }} />
          <Box sx={{ height: 390 }}>
            <DataGridBasic data={org.employees ?? []} />
          </Box>
        </Card>
      </Stack>
      <AddEmployeeDialog organization={org} dialog={newEmployeeDialog} />
    </>
  )
}
