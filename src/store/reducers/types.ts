import { reducer as historyReducer, storeKey as historyStoreKey } from 'store/history'
import { reducer as settingsReducer, storeKey as settingsStoreKey } from 'store/settings'
import { reducer as dialogsReducer, storeKey as dialogsStoreKey } from 'store/dialogs'

export interface RootState {
	[historyStoreKey]: ReturnType<typeof historyReducer>
	[settingsStoreKey]: ReturnType<typeof settingsReducer>
	[dialogsStoreKey]: ReturnType<typeof dialogsReducer>
}
