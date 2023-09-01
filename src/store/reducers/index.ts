import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import { PersistPartial } from 'store/types'
import * as history from 'store/reducers/history'
import * as settings from 'store/reducers/settings'
import * as dialogs from 'store/reducers/dialogs'

export const initialState = {
	[history.storeKey]: history.initialState as typeof history.initialState & PersistPartial,
	[settings.storeKey]: settings.initialState as typeof settings.initialState & PersistPartial,
	[dialogs.storeKey]: dialogs.initialState as typeof dialogs.initialState,
}

export const persistConfigs = {
	[history.storeKey]: history.persistConfig,
	[settings.storeKey]: settings.persistConfig,
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
})

