import type { AppDispatch, RootState } from './store'

export type Role = 'employee' | 'employer'

export type AppState = {
  role?: Role
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
