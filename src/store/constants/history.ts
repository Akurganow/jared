import { HistoryState } from 'src/types/history'

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
