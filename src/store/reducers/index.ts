import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'
import dialogsReducer from 'store/reducers/dialogs'
import settingsReducer from 'store/reducers/settings'
import sectionsReducer from 'store/reducers/sections'

import { initialState as dialogsInitialState, storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { initialState as settingsInitialState, storeKey as settingsStoreKey } from 'store/constants/settings'
import { initialState as sectionsInitialState, storeKey as sectionsStoreKey } from 'store/constants/sections'

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

export const initialState = {
	[dialogsStoreKey]: dialogsInitialState,
	[settingsStoreKey]: settingsInitialState as typeof settingsInitialState & PersistPartial,
	[sectionsStoreKey]: sectionsInitialState as typeof sectionsInitialState & PersistPartial,
}

export const rootReducer = combineReducers({
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
