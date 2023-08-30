import { createSelector } from 'reselect'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import storage from 'redux-persist/lib/storage'
import { RootState } from 'store/types'
import { VCSHistoryItem, ITSHistoryItem } from 'libs/history/types'
import { selectedSettings } from 'store/settings'
import { processVCS } from 'libs/history/vcs'
import { processITS } from 'libs/history/its'
import { sortByLastVisitTime, sortByVisitCount } from 'libs/history'

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
const createAsync = asyncFactory<RootState>(createAction)

const getHistoryItems = createAsync<string, chrome.history.HistoryItem[]>(
	'getHistoryItems',
	async (text, dispatch, getState) => {
		const { maxResults, numDays } = selectedSettings(getState())
		const items: chrome.history.HistoryItem[] = []
		const keys = text.split(',').map((key) => key.trim())
		const currentTime = new Date().getTime()
		const oneWeekAgo = currentTime - 1000 * 60 * 60 * 24 * numDays.value

		for (const key of keys) {
			const query: chrome.history.HistoryQuery = {
				maxResults: maxResults.value,
				text: key,
				startTime: oneWeekAgo,
			}
			const results = await chrome.history.search(query)
			items.push(...results)
		}

		return items
			.filter((value, index, array) =>
				array.indexOf(value) === index
			)
	}
)

export const getVCS = createAsync<void, void>(
	'getVCS',
	async (_, dispatch, getState) => {
		const { vcsQuery } = selectedSettings(getState())
		const vcsHistory = await dispatch(getHistoryItems(vcsQuery.value))
		const vcs = vcsHistory
			.sort(sortByLastVisitTime)
			.map(processVCS)

		dispatch(updateVCSHistory(vcs))
	})
export const getITS = createAsync<void, void>(
	'getITS',
	async (_, dispatch, getState) => {
		const { itsQuery } = selectedSettings(getState())
		const itsHistory = await dispatch(getHistoryItems(itsQuery.value))
		const its = itsHistory
			.sort(sortByVisitCount)
			.map(processITS)

		dispatch(updateITSHistory(its))
	})
export const getUserContent = createAsync<void, void>(
	'getUserContent',
	async (_, dispatch, getState) => {
		const { userQuery } = selectedSettings(getState())
		const userContent = await dispatch(getHistoryItems(userQuery.value))

		dispatch(updateUserHistory(userContent))
	})
export const getHistory = createAsync<void, void>(
	'getHistory',
	async (_, dispatch) => {
		await dispatch(getVCS())
		await dispatch(getITS())
		await dispatch(getUserContent())
	}
)

export const updateUserHistory = createAction<HistoryItem[]>('updateHistory')
export const updateVCSHistory = createAction<VCSHistoryItem[]>('updateGitHistory')
export const updateITSHistory = createAction<ITSHistoryItem[]>('updateJiraHistory')

// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(updateUserHistory, (state, items) => ({
		...state,
		main: items,
	}))
	.case(updateVCSHistory, (state, items) => ({
		...state,
		vcs: items,
	}))
	.case(updateITSHistory, (state, items) => ({
		...state,
		its: items,
	}))

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
