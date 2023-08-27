import { createSelector } from 'reselect'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import storage from 'redux-persist/lib/storage'
import { VCSHistoryItem, ITSHistoryItem } from 'libs/history/types'

export interface HistoryItem extends chrome.history.HistoryItem {}

export interface HistoryState {
	main: HistoryItem[];
	vcs: VCSHistoryItem[];
	its: ITSHistoryItem[];
}

export const storeKey = 'history'
export const initialState: HistoryState = {
	main: [],
	vcs: [],
	its: [],
}
export const persistConfig = {
	key: `jared/${storeKey}`,
	storage,
}

// Actions
const createAction = actionCreatorFactory(storeKey)

export const addItem = createAction<HistoryItem>('addItem')
export const updateMainHistory = createAction<HistoryItem[]>('updateHistory')
export const updateGitHistory = createAction<VCSHistoryItem[]>('updateGitHistory')
export const updateTicketsHistory = createAction<ITSHistoryItem[]>('updateJiraHistory')

// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(updateMainHistory, (state, items) => ({
		...state,
		main: items,
	}))
	.case(updateGitHistory, (state, items) => ({
		...state,
		vcs: items,
	}))
	.case(updateTicketsHistory, (state, items) => ({
		...state,
		its: items,
	}))

interface RootState {
	[storeKey]: ReturnType<typeof reducer>
}

// Selectors
const rawSelectedMainItems = (state: RootState) => state[storeKey].main
const rawSelectedVCSItems = (state: RootState) => state[storeKey].vcs
const rawSelectedITSItems = (state: RootState) => state[storeKey].its

export const selectedTicketItemById = createSelector(
	rawSelectedITSItems,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedGitItemById = createSelector(
	rawSelectedVCSItems,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedGitItems = createSelector(
	rawSelectedVCSItems,
	(items) => items
		? items.filter((item, index, array) =>
			!!item.type && item.type !== 'unknown' && item.provider !== 'unknown'
			&& array.findIndex(i => i.title === item.title) === index
		)
		: [],
)
export const selectedTickets = createSelector(
	rawSelectedITSItems,
	(items) => items
		? items.filter((item, index, array) =>
			!!item.type && item.type !== 'unknown'
			&& array.findIndex(i => i.title === item.title) === index
		)
		: [],
)

export const selectedMainItems = createSelector(
	rawSelectedMainItems,
	selectedGitItemById,
	selectedTicketItemById,
	(main, getGit, getTicket) => main
		.filter((item, index, array) => {
			const foundInGit = getGit(item.id)
			const foundInTickets = getTicket(item.id)

			return !foundInGit && !foundInTickets
				&& array.findIndex(i => i.title === item.title) === index
		}),
)
