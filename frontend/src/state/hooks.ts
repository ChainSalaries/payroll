import { AsyncThunkAction } from '@reduxjs/toolkit'
import { useQuery } from '@tanstack/react-query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, AppThunk, RootState } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type ActionType = AsyncThunkAction<any, any, any> | AppThunk<any>

// Helper function to serialize dependencies
const serialize = (value: any): string => {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return JSON.stringify(value)
}

// Helper function to generate query key
const getQueryKey = (name: string, dependencies: any[] = []) => {
  const actionName = name || 'unknownAction'
  return [actionName, ...dependencies.map(serialize)]
}
