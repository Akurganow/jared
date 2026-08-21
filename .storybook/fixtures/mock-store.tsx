import { configureStore } from '@reduxjs/toolkit'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { preloadedState, reducer } from 'src/store'
import { spyOn } from 'storybook/test'

export const store = configureStore({
	reducer,
	preloadedState,
})

spyOn(store, 'dispatch')

export const Mockstore = ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>
