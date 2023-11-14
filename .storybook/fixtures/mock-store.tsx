import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { jest } from '@storybook/jest'
import { preloadedState, reducer } from 'src/store'

export const store = configureStore({
	reducer,
	preloadedState,
})

jest.spyOn(store, 'dispatch')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
export const Mockstore = ({ children }) => <Provider store={store}>{children}</Provider>

