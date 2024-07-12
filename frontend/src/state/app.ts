import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, Role } from './types'

export const APP_INITIAL_STATE: AppState = {
  role: undefined,
}

const counterSlice = createSlice({
  name: 'app',
  initialState: APP_INITIAL_STATE,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload
    },
  },
})

export const { setRole } = counterSlice.actions
export default counterSlice.reducer
