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
import { Organization } from '@/state/types'

// ----------------------------------------------------------------------

type Props = {
  organization: Organization
  dialog: ReturnType
}

export default function AddEmployeeDialog({ organization, dialog }: Props) {
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
          />
          <TextField
            autoFocus
            fullWidth
            type="number"
            margin="dense"
            variant="outlined"
            label="Daily salary"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={dialog.onFalse} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
