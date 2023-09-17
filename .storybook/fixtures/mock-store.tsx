import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { jest } from '@storybook/jest'
import { rootReducer, initialState } from 'store/reducers'

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
})

jest.spyOn(store, 'dispatch')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
export const Mockstore = ({ children }) => <Provider store={store}>{children}</Provider>

