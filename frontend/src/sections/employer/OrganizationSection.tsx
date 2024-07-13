'use client'

import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { Employee, Organization } from '@/state/types'
// @mui
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// components
import Iconify from '@/components/iconify'

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
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
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
    <div>
      <Stack sx={{ width: '100%' }}>
        <Typography margin={2} variant="h2">
          Employees
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
          <DataGridBasic data={organization.employees} />
        </Box>
      </Stack>
    </div>
  )
}
