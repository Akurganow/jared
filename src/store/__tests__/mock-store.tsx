import { configureStore, type ThunkDispatch } from '@reduxjs/toolkit'
import type { JSX } from 'react'
import { Provider } from 'react-redux'
import type { UnknownAction } from 'redux'
import { reducer } from 'src/store'
import * as dialogs from 'store/constants/dialogs'
import * as sections from 'store/constants/sections'
import * as settings from 'store/constants/settings'
import type { RootState } from 'store/types'

function mergeInitialState(initialState: object, newState: object) {
	return Object.assign({}, initialState, newState)
}

export const defaultInitialState: ReturnType<typeof reducer> = {
	[dialogs.storeKey]: dialogs.initialState,
	[settings.storeKey]: {
		...settings.initialState,
		_persist: { version: -1, rehydrated: true },
	},
	[sections.storeKey]: {
		...sections.initialState,
		_persist: { version: -1, rehydrated: true },
	},
}

export const configureMockStore = (initialState = {}) => {
	const store = configureStore({
		reducer: reducer,
		preloadedState: mergeInitialState(defaultInitialState, initialState),
		middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	})

	jest.spyOn(store, 'dispatch')

	return {
		...store,
		dispatch: store.dispatch as ThunkDispatch<RootState, never, UnknownAction>,
	}
}

export const WithStore = ({ children, initialState = {} }: { children: JSX.Element; initialState: object }) => (
	<Provider store={configureMockStore(initialState)}>{children}</Provider>
)
