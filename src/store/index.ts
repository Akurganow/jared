import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { devToolsEnhancer } from '@redux-devtools/remote'
import type { Store } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, persistReducer, persistStore, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { syncStorage } from 'redux-persist-webextension-storage'
import { initialState as dialogsInitialState, storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { initialState as sectionsInitialState, storeKey as sectionsStoreKey } from 'store/constants/sections'
import { initialState as settingsInitialState, storeKey as settingsStoreKey } from 'store/constants/settings'
import dialogsReducer from 'store/reducers/dialogs'
import sectionsReducer from 'store/reducers/sections'
import settingsReducer from 'store/reducers/settings'
import type { PersistState, RootState } from 'store/types'

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

const store = configureStore({
	reducer,
	preloadedState,
	// redux-persist диспатчит несериализуемые action — исключаем их из проверки,
	// как рекомендует официальная документация Redux Toolkit
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
	// enhancers: [devToolsEnhancer({ realtime: true, hostname: 'localhost', port: 1024 })],
})

const persistor = persistStore(store as unknown as Store)

// persistor.subscribe(async () => {
// 	const dispatch: ThunkDispatch<RootState, never, UnknownAction> = store.dispatch
// 	const { settings } = store.getState()
//
// 	if (settings._persist.rehydrated) {
// 		await dispatch(updateHistory())
// 	}
// })

export type { RootState }
export { persistor, store }
