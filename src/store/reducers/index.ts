import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
// import createCompressor from 'redux-persist-transform-compress'

import * as history from './history'
import * as settings from './settings'
import * as dialogs from './dialogs'
// import * as timezones from './timezones'
// import * as favicons from './favicons'

interface PersistPartial {
    _persist: { version: number; rehydrated: boolean };
}

// const compressor = createCompressor()

export const initialState = {
	[history.storeKey]: history.initialState as typeof history.initialState & PersistPartial,
	[settings.storeKey]: settings.initialState as typeof settings.initialState & PersistPartial,
	[dialogs.storeKey]: dialogs.initialState as typeof dialogs.initialState,
	// [timezones.storeKey]: timezones.initialState as typeof timezones.initialState & PersistPartial,
	// [favicons.storeKey]: favicons.initialState as typeof favicons.initialState & PersistPartial,
}

export const persistConfigs = {
	[history.storeKey]: history.persistConfig,
	[settings.storeKey]: settings.persistConfig,
	// [timezones.storeKey]: timezones.persistConfig,
	// [favicons.storeKey]: favicons.persistConfig,
}

export const rootReducer = combineReducers({
	[history.storeKey]: persistReducer(
		persistConfigs[history.storeKey],
		history.reducer,
	),
	[settings.storeKey]: persistReducer(
		persistConfigs[settings.storeKey],
		settings.reducer,
	),
	[dialogs.storeKey]: dialogs.reducer,
	// [timezones.storeKey]: persistReducer(
	//     persistConfigs[timezones.storeKey],
	//     timezones.reducer,
	// ),
	// [favicons.storeKey]: persistReducer(
	//     persistConfigs[favicons.storeKey],
	//     favicons.reducer,
	// ),
})

export type RootState = ReturnType<typeof rootReducer>
