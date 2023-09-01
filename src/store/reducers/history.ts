import { createSelector } from 'reselect'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import storage from 'redux-persist/lib/storage'
import { RootState } from 'store/types'
import { selectedSettings } from 'store/settings'
import { processVCS } from 'libs/history/vcs'
import { processITS } from 'libs/history/its'
import { sortByLastVisitTime, sortByVisitCount } from 'libs/history/helpers'

export interface HistoryItem extends chrome.history.HistoryItem {}

export interface HistoryState {
	main: HistoryItem[];
	vcs: HistoryItem[];
	its: HistoryItem[];
	pinned: {
		main: HistoryItem[];
		vcs: HistoryItem[];
		its: HistoryItem[];
	}
}

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

// Helpers
function filterItems(pinned: HistoryItem[]) {
	return (item: HistoryItem, index: number, array: HistoryItem[]) =>
		array.findIndex(i => i.title === item.title) === index
		&& !pinned.find(pinnedItem => pinnedItem.title === item.title)
}

function movePinnedItemBetweenArrays(arrFrom: HistoryItem[], arrTo: HistoryItem[], id: HistoryItem['id'], pinned: boolean) {
	const item = arrFrom.find(item => item.id === id)

	return item
		? [
			arrFrom.filter(item => item.id !== id),
			[...arrTo, { ...item, pinned }],
		]
		: [arrFrom, arrTo]
}

// Actions
const createAction = actionCreatorFactory(storeKey)
const createAsync = asyncFactory<RootState>(createAction)

const getHistoryItems = createAsync<string, chrome.history.HistoryItem[]>(
	'getHistoryItems',
	async (text, _dispatch, getState) => {
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

export const updateVCS = createAsync<void, void>(
	'getVCS',
	async (_, dispatch, getState) => {
		const { vcsQuery } = selectedSettings(getState())
		const vcs = await dispatch(getHistoryItems(vcsQuery.value))

		dispatch(updateVCSHistory(vcs))
	})
export const updateITS = createAsync<void, void>(
	'getITS',
	async (_, dispatch, getState) => {
		const { itsQuery } = selectedSettings(getState())
		const its = await dispatch(getHistoryItems(itsQuery.value))

		dispatch(updateITSHistory(its))
	})
export const updateUserContent = createAsync<void, void>(
	'getUserContent',
	async (_, dispatch, getState) => {
		const state = getState()
		const { userQuery } = selectedSettings(state)
		const userContent = await dispatch(getHistoryItems(userQuery.value))

		dispatch(updateUserHistory(userContent))
	})
export const updateHistory = createAsync<void, void>(
	'getHistory',
	async (_, dispatch) => {
		await dispatch(updateVCS())
		await dispatch(updateITS())
		await dispatch(updateUserContent())
	}
)

export const pinItem = createAction<HistoryItem['id']>('pinItem')
export const unpinItem = createAction<HistoryItem['id']>('unpinItem')
export const updateUserHistory = createAction<HistoryItem[]>('updateHistory')
export const updateVCSHistory = createAction<HistoryItem[]>('updateGitHistory')
export const updateITSHistory = createAction<HistoryItem[]>('updateJiraHistory')

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
	.case(pinItem, (state, id) => {
		const [main, mainPinned] = movePinnedItemBetweenArrays(state.main, state.pinned.main, id, true)
		const [vcs, vcsPinned] = movePinnedItemBetweenArrays(state.vcs, state.pinned.vcs, id, true)
		const [its, itsPinned] = movePinnedItemBetweenArrays(state.its, state.pinned.its, id, true)

		return {
			...state,
			pinned: {
				main: mainPinned,
				vcs: vcsPinned,
				its: itsPinned,
			},
			main,
			vcs,
			its,
		}
	})
	.case(unpinItem, (state, id) => {
		const [mainPinned, main] = movePinnedItemBetweenArrays(state.pinned.main, state.main, id, false)
		const [vcsPinned, vcs] = movePinnedItemBetweenArrays(state.pinned.vcs, state.vcs, id, false)
		const [itsPinned, its] = movePinnedItemBetweenArrays(state.pinned.its, state.its, id, false)

		return {
			...state,
			pinned: {
				main: mainPinned,
				vcs: vcsPinned,
				its: itsPinned,
			},
			main,
			vcs,
			its,
		}
	})

// Selectors
const rawSelectedMainItems = (state: RootState) => state[storeKey].main
const rawSelectedVCSItems = (state: RootState) => state[storeKey].vcs
const rawSelectedITSItems = (state: RootState) => state[storeKey].its
const rawSelectedPinnedItems = (state: RootState) => state[storeKey].pinned

export const selectedPinnedVCSItems = createSelector(
	rawSelectedPinnedItems,
	(items) => items.vcs
)
export const selectedPinnedITSItems = createSelector(
	rawSelectedPinnedItems,
	(items) => items.its
)
export const selectedPinnedUserContentItems = createSelector(
	rawSelectedPinnedItems,
	(items) => items.main
)

export const selectedITSItemById = createSelector(
	rawSelectedITSItems,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedVCSItemById = createSelector(
	rawSelectedVCSItems,
	(items) => (id: string) =>
		items.find(item => item.id === id)
)

export const selectedVCS = createSelector(
	rawSelectedVCSItems,
	selectedPinnedVCSItems,
	(items, pinned) => {
		const filtered = items.filter(filterItems(pinned)).sort(sortByLastVisitTime)

		return [...pinned, ...filtered].map(processVCS)
	},
)
export const selectedITS = createSelector(
	rawSelectedITSItems,
	selectedPinnedITSItems,
	(items, pinned) => {
		const filtered = items.filter(filterItems(pinned)).sort(sortByVisitCount)

		return [...pinned, ...filtered].map(processITS)
	},
)

export const selectedUserContentItems = createSelector(
	rawSelectedMainItems,
	selectedVCSItemById,
	selectedITSItemById,
	(main, getVCS, getITS) => main
		.filter((item, index, array) => {
			const foundInVCS = getVCS(item.id)
			const foundInITS = getITS(item.id)

			return !foundInVCS && !foundInITS
				&& array.findIndex(i => i.title === item.title) === index
		}),
)
