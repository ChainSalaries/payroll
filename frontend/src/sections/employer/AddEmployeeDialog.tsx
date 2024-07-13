// @mui
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// hooks
import { ReturnType } from '@/hooks/use-boolean'
import { Address, Organization } from '@/state/types'
import { InputAdornment } from '@mui/material'
import { useState } from 'react'
import { addNewEmployee } from '@/services/write-services'

// ----------------------------------------------------------------------

type Props = {
  organization: Organization
  dialog: ReturnType
}

export default function AddEmployeeDialog({ organization, dialog }: Props) {
  const [employeeAddress, setEmployeeAddress] = useState<string>('')
  const [salary, setSalary] = useState<number>(0)
  const [activity, setActivity] = useState<string>('')

  const onAddEmployee = async () => {
    await addNewEmployee(employeeAddress as Address, salary, activity)
    dialog.onFalse()
  }

  return (
    <div>
      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>New Employee</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            After the employee account is added, the employee must be verified with worldId to
            approve that they are real huamn being instad of AI
          </Typography>

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Wallet Address or ENS"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            type="number"
            margin="dense"
            variant="outlined"
            label="Daily salary"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            InputProps={{
              endAdornment: <InputAdornment position="end">USDC</InputAdornment>,
            }}
          />
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={onAddEmployee} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
