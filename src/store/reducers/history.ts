import { createSelector } from 'reselect'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import storage from 'redux-persist/lib/storage'
import { GitHistoryItem, TicketHistoryItem } from 'libs/history/types'

export interface HistoryItem extends chrome.history.HistoryItem {}

export interface HistoryState {
	main: HistoryItem[];
	git: GitHistoryItem[];
	jira: TicketHistoryItem[];
}

export const storeKey = 'history'
export const initialState: HistoryState = {
	main: [],
	git: [],
	jira: [],
}
export const persistConfig = {
	key: `jared/${storeKey}`,
	storage,
}

// Actions
const createAction = actionCreatorFactory(storeKey)

export const addItem = createAction<HistoryItem>('addItem')
export const updateMainHistory = createAction<HistoryItem[]>('updateHistory')
export const updateGitHistory = createAction<GitHistoryItem[]>('updateGitHistory')
export const updateTicketsHistory = createAction<TicketHistoryItem[]>('updateJiraHistory')

// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(updateMainHistory, (state, items) => ({
		...state,
		main: items,
	}))
	.case(updateGitHistory, (state, items) => ({
		...state,
		git: items,
	}))
	.case(updateTicketsHistory, (state, items) => ({
		...state,
		jira: items,
	}))

interface RootState {
	[storeKey]: ReturnType<typeof reducer>
}

// Selectors
const rawSelectedMainItems = (state: RootState) => state[storeKey].main
const rawSelectedGitItems = (state: RootState) => state[storeKey].git
const rawSelectedTickets = (state: RootState) => state[storeKey].jira

export const selectedTicketItemById = createSelector(
	rawSelectedTickets,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedGitItemById = createSelector(
	rawSelectedGitItems,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedGitItems = createSelector(
	rawSelectedGitItems,
	(items) => items
		? items.filter((item, index, array) =>
			!!item.type && item.type !== 'unknown' && item.vcs !== 'unknown'
			&& array.findIndex(i => i.title === item.title) === index
		)
		: [],
)
export const selectedTickets = createSelector(
	rawSelectedTickets,
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
