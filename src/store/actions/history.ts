import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { RootState } from 'store/types' // eslint-disable-line import/no-cycle
import { HistoryItem } from 'store/types/history'
import { selectedSettings } from 'store/selectors/settings'
import { storeKey } from 'store/constants/history'

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
				maxResults: maxResults.value * 2, // double the max results to account for duplicates
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
