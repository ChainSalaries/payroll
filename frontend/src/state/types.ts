import type { AppDispatch, RootState } from './store'

export type Role = 'employee' | 'employer'

export type AppState = {
  role?: Role
  organization?: Organization
}

export enum FetchStatus {
  Idle,
  Loading,
  Success,
  Error,
}

export type ThunkConfig = {
  dispatch: AppDispatch
  state: RootState
  extra: any
}

export type Employee = {
  address: string
  orgAddress: string
  verified: boolean
  salary: number
  activity: string
  startMoment: number
  latestPayReceived: number
  openBalance: number
}

export type Organization = {
  orgAddress: `0x${string}`
  orgId: number
  orgName: string
  orgTreasury: number
  employeeCount: number
  employees?: Employee[]
}

export type Address = `0x${string}`
