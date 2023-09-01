import storage from 'redux-persist/lib/storage'
import { HistoryState } from 'store/types/history'

export const storeKey = 'history'
export const initialState: HistoryState = {
	main: [],
	vcs: [],
	its: [],
	pinned: {
		main: [],
		vcs: [],
		its: [],
	},
}
export const persistConfig = {
	key: `jared/${storeKey}`,
	storage,
}
