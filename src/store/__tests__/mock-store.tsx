import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from 'store/reducers'
import * as dialogs from 'store/constants/dialogs'
import * as history from 'store/constants/history'
import * as settings from 'store/constants/settings'
import * as bookmarks from 'store/constants/bookmarks'
import * as sections from 'store/constants/sections'
import type { JSX } from 'react'
import type { RootState } from 'store/types'
import type { AnyAction } from 'redux'

function mergeInitialState(initialState: object, newState: object) {
	return Object.assign({}, initialState, newState)
}

export const defaultInitialState: ReturnType<typeof rootReducer> = {
	[dialogs.storeKey]: dialogs.initialState,
	[history.storeKey]: {
		...history.initialState,
		_persist: { version: -1, rehydrated: true }
	},
	[settings.storeKey]: {
		...settings.initialState,
		_persist: { version: -1, rehydrated: true }
	},
	[bookmarks.storeKey]: {
		...bookmarks.initialState,
		_persist: { version: -1, rehydrated: true }
	},
	[sections.storeKey]: {
		...sections.initialState,
		_persist: { version: -1, rehydrated: true }
	}
}

export const configureMockStore = (initialState = {}) => {
	const store = configureStore({
		reducer: rootReducer,
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
