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
  salary: number
  joined: number
  balance: number
  verified: boolean
}

export type Organization = {
  name: string
  id: string
  balance: number
  employees: Employee[]
}
