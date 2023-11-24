import { AnyAction, combineReducers, Store } from 'redux'
import { configureStore, ThunkMiddleware } from '@reduxjs/toolkit'
// import { devToolsEnhancer } from '@redux-devtools/remote'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import { syncStorage } from 'redux-persist-webextension-storage'
import storage from 'redux-persist/lib/storage'
import { initialState as dialogsInitialState, storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { initialState as settingsInitialState, storeKey as settingsStoreKey } from 'store/constants/settings'
import { initialState as sectionsInitialState, storeKey as sectionsStoreKey } from 'store/constants/sections'
import dialogsReducer from 'store/reducers/dialogs'
import settingsReducer from 'store/reducers/settings'
import sectionsReducer from 'store/reducers/sections'
import { PersistState, RootState } from 'store/types'

type StorageInterface = typeof storage

function createPersistConfig(key: string, storage: StorageInterface) {
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
	[settingsStoreKey]: settingsInitialState as PersistState<typeof settingsInitialState>,
	[sectionsStoreKey]: sectionsInitialState as PersistState<typeof sectionsInitialState>,
}

const middleware = [thunk as ThunkMiddleware<RootState, AnyAction>]

const store = configureStore({
	reducer,
	preloadedState,
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
	// enhancers: [devToolsEnhancer({ realtime: true, hostname: 'localhost', port: 1024 })],
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
