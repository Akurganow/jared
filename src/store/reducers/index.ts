import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'
import dialogsReducer from 'store/reducers/dialogs'
import historyReducer from 'store/reducers/history'
import settingsReducer from 'store/reducers/settings'
import bookmarksReducer from 'store/reducers/bookmarks'

import { initialState as dialogsInitialState, storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { initialState as historyInitialState, storeKey as historyStoreKey } from 'store/constants/history'
import { initialState as settingsInitialState, storeKey as settingsStoreKey } from 'store/constants/settings'
import { initialState as bookmarksInitialState, storeKey as bookmarksStoreKey } from 'store/constants/bookmarks'

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
	[historyStoreKey]: historyInitialState as typeof historyInitialState & PersistPartial,
	[settingsStoreKey]: settingsInitialState as typeof settingsInitialState & PersistPartial,
	[bookmarksStoreKey]: bookmarksInitialState as typeof bookmarksInitialState & PersistPartial,
}

export const rootReducer = combineReducers({
	[dialogsStoreKey]: dialogsReducer,
	[historyStoreKey]: persistReducer(
		createPersistConfig(historyStoreKey, localStorage),
		historyReducer,
	),
	[settingsStoreKey]: persistReducer(
		createPersistConfig(settingsStoreKey, syncStorage),
		settingsReducer,
	),
	[bookmarksStoreKey]: persistReducer(
		createPersistConfig(bookmarksStoreKey, localStorage),
		bookmarksReducer,
	),
})
