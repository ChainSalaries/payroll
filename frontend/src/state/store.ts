import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from './app'
import { ThunkConfig } from './types'

const persistConfig = {
  key: 'root1',
  storage,
}

const combinedReducers = combineReducers({
  app: appReducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ThunkConfig['extra'],
  AnyAction
>

export default store
