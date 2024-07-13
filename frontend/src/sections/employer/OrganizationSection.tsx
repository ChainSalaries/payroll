'use client'

import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Card, CardHeader, Stack, TextField, Typography } from '@mui/material'
import { Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'
import moment from 'moment' // Add this line to import the 'moment' library

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
    width: 160,
    editable: true,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 120,
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
    field: 'joined',
    headerName: 'Joined',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => moment.unix(params.row.joined).format('YYYY-MM-DD'),
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
  organization: Organization
}

export default function OrganizationSection({ organization }: Props) {
  const dispatch = useAppDispatch()

  return (
    <Stack sx={{ width: '100%' }}>
      <Card>
        <CardHeader title="Employee" sx={{ mb: 2 }} />
        <Box sx={{ height: 390 }}>
          <DataGridBasic data={organization.employees} />
        </Box>
      </Card>
    </Stack>
  )
}
