import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as dialogs from 'store/constants/dialogs'
import * as settings from 'store/constants/settings'
import * as sections from 'store/constants/sections'
import { reducer } from 'src/store'
import type { JSX } from 'react'
import type { RootState } from 'store/types'
import type { AnyAction } from 'redux'

function mergeInitialState(initialState: object, newState: object) {
	return Object.assign({}, initialState, newState)
}

export const defaultInitialState: ReturnType<typeof reducer> = {
	[dialogs.storeKey]: dialogs.initialState,
	[settings.storeKey]: {
		...settings.initialState,
		_persist: { version: -1, rehydrated: true }
	},
	[sections.storeKey]: {
		...sections.initialState,
		_persist: { version: -1, rehydrated: true }
	}
}

export const configureMockStore = (initialState = {}) => {
	const store = configureStore({
		reducer: reducer,
		preloadedState: mergeInitialState(defaultInitialState, initialState),
		middleware: [thunk],
	})

	jest.spyOn(store, 'dispatch')

	return {
		...store,
		dispatch: store.dispatch as ThunkDispatch<RootState, never, AnyAction>,
	}
}

export const WithStore = ({ children, initialState = {} }: { children: JSX.Element, initialState: object}) =>
	<Provider store={configureMockStore(initialState)}>
		{children}
	</Provider>
