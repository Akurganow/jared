import { AnyAction, combineReducers, Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/remote'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'
import storage from 'redux-persist/lib/storage'
import { RootState } from 'store/types'
import { initialState as dialogsInitialState, storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { initialState as settingsInitialState, storeKey as settingsStoreKey } from 'store/constants/settings'
import { initialState as sectionsInitialState, storeKey as sectionsStoreKey } from 'store/constants/sections'
import dialogsReducer from 'store/reducers/dialogs'
import settingsReducer from 'store/reducers/settings'
import sectionsReducer from 'store/reducers/sections'

const thunk: ThunkMiddleware<RootState, AnyAction> = thunkMiddleware

interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

type Storage = typeof localStorage | typeof syncStorage

function createPersistConfig(key: string, storage: Storage) {
	return {
		key: `jared/${key}`,
		storage,
	}
}

export const reducer = combineReducers({
	[dialogsStoreKey]: dialogsReducer(dialogsInitialState),
	[settingsStoreKey]: persistReducer(
		createPersistConfig(settingsStoreKey, syncStorage),
		settingsReducer(settingsInitialState),
	),
	[sectionsStoreKey]: persistReducer(
		createPersistConfig(sectionsStoreKey, storage),
		sectionsReducer(sectionsInitialState),
	),
})

export const preloadedState = {
	[dialogsStoreKey]: dialogsInitialState,
	[settingsStoreKey]: settingsInitialState as typeof settingsInitialState & PersistPartial,
	[sectionsStoreKey]: sectionsInitialState as typeof sectionsInitialState & PersistPartial,
}

const store = configureStore({
	reducer,
	preloadedState,
	middleware: [thunk],
	devTools: process.env.NODE_ENV !== 'production',
	enhancers: [devToolsEnhancer({ realtime: true, hostname: 'localhost', port: 1024 })],
})

const persistor = persistStore(store as unknown as Store)

// persistor.subscribe(async () => {
// 	const dispatch: ThunkDispatch<RootState, never, AnyAction> = store.dispatch
// 	const { settings } = store.getState()
//
// 	if (settings._persist.rehydrated) {
// 		await dispatch(updateHistory())
// 	}
// })

export { store, persistor }
