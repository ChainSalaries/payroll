import { toast } from 'react-toastify'
import { getEnsAddress } from '@wagmi/core'
import { normalize } from 'viem/ens'
import { sepolia } from 'wagmi/chains'
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
import { useRef, useState } from 'react'
import { addNewEmployee } from '@/services/write-services'
import { config } from '@/config'

// ----------------------------------------------------------------------

type Props = {
  organization: Organization
  dialog: ReturnType
}

export default function AddEmployeeDialog({ organization, dialog }: Props) {
  const [employeeAddress, setEmployeeAddress] = useState<string>('')
  const [addessOrEns, setAddessOrEns] = useState<string>('')
  const [salary, setSalary] = useState<number>()
  const [activity, setActivity] = useState<string>('')

  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const requestIdRef = useRef(0)

  const onAddEmployee = async () => {
    if (!employeeAddress || !salary || !activity) return
    try {
      const tx = await addNewEmployee(employeeAddress as Address, salary * 1000000000000000000, activity)
      toast.success(`Add employee transaction submitted. transaction: ${tx}`)
    } catch (err) {
      toast.error(`Add employee: ${error}`)
    }
    dialog.onFalse()
  }

  const onEmployeeAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddessOrEns(value)
    if (value.startsWith('0x')) {
      setEmployeeAddress(e.target.value)
      setError(false)
      setHelperText('')
    } else {
      if (!value) return
      // Increment the requestId to indicate a new request
      requestIdRef.current += 1
      const currentRequestId = requestIdRef.current

      getEnsAddress(config, {
        chainId: sepolia.id,
        name: normalize(value),
      }).then((address) => {
        if (currentRequestId === requestIdRef.current) {
          if (!!address) {
            setEmployeeAddress(address)
            setError(false)
            setHelperText('')
          } else {
            setEmployeeAddress('')
            setError(true)
            setHelperText('Invalid ENS')
          }
        }
      })
    }
  }

  return (
    <div>
      <Dialog open={dialog.value} onClose={dialog.onFalse}>
        <DialogTitle>New Employee</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            After adding an employee, they must verify their personhood with World ID before receiving payments.
          </Typography>

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            error={error}
            helperText={helperText}
            label="Wallet Address or ENS"
            value={addessOrEns}
            onChange={onEmployeeAddressChange}
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
              endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
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
