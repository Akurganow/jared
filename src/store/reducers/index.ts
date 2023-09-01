import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import { PersistPartial } from 'store/types'
import * as history from 'store/reducers/history'
import * as settings from 'store/reducers/settings'
import * as dialogs from 'store/reducers/dialogs'
import { initialState as initialState1, persistConfig, storeKey } from 'store/constants/history'
import {
	initialState as initialState2,
	persistConfig as persistConfig1,
	storeKey as storeKey1
} from 'store/constants/settings'
import { initialState as initialState3, storeKey as storeKey2 } from 'store/constants/dialogs'

export const initialState = {
	[storeKey]: initialState1 as typeof initialState1 & PersistPartial,
	[storeKey1]: initialState2 as typeof initialState2 & PersistPartial,
	[storeKey2]: initialState3 as typeof initialState3,
}

export const persistConfigs = {
	[storeKey]: persistConfig,
	[storeKey1]: persistConfig1,
}

export const rootReducer = combineReducers({
	[storeKey]: persistReducer(
		persistConfigs[storeKey],
		history.reducer,
	),
	[storeKey1]: persistReducer(
		persistConfigs[storeKey1],
		settings.reducer,
	),
	[storeKey2]: dialogs.reducer,
})

