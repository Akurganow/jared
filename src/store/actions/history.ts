import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { selectedSettings } from 'store/selectors/settings'
import { storeKey } from 'store/constants/history'
import { createHistoryItemProcessor } from 'utils/history'
import { getITSQueries, getVCSQueries } from 'utils/history/configs'
import { filterBySameId } from 'utils/array'
import type { HistoryItem, HistoryQuery, ITSHistoryItem, VCSHistoryItem } from 'types/history'
import type { RootState } from 'store/types'

const createAction = actionCreatorFactory(storeKey)
const createAsync = asyncFactory<RootState>(createAction)

type HistoryItemsTypes = HistoryItem[] | VCSHistoryItem[] | ITSHistoryItem[]
const getHistoryItems = createAsync<HistoryQuery[], HistoryItemsTypes>(
	'getHistoryItems',
	async (queries, _dispatch, getState) => {
		const { maxResults, numDays } = selectedSettings(getState())
		const items: HistoryItem[] = []
		const currentTime = new Date().getTime()
		const oneWeekAgo = currentTime - 1000 * 60 * 60 * 24 * numDays.value

		for (const q of queries) {
			const query: chrome.history.HistoryQuery = {
				maxResults: (q.maxResults || maxResults.value) * 2, // * 2 to filter out
				text: q.text,
				startTime: oneWeekAgo,
			}

			if (q.type) {
				const itemProcessor = createHistoryItemProcessor(q.type)
				const results = (await chrome.history.search(query))
					.filter(item => item.url?.includes(q.text))
					.map(itemProcessor)

				items.push(...results)
			} else {
				const results = (await chrome.history.search(query))
					.filter(item => item.url?.includes(q.text))

				items.push(...results as HistoryItem[])
			}
		}

		return items.filter(filterBySameId)
	}
)
export const updateVCS = createAsync<void, void>(
	'updateVCS',
	async (_, dispatch, getState) => {
		const { vcsQuery } = selectedSettings(getState())
		const queries = getVCSQueries(vcsQuery.value)
		const vcs = await dispatch(getHistoryItems(queries)) as VCSHistoryItem[]

		dispatch(updateVCSHistory(vcs))
		dispatch(updateVCSPinnedHistory(vcs))
	})
export const updateITS = createAsync<void, void>(
	'updateITS',
	async (_, dispatch, getState) => {
		const { itsQuery } = selectedSettings(getState())
		const queries = getITSQueries(itsQuery.value)
		const its = await dispatch(getHistoryItems(queries)) as ITSHistoryItem[]
		dispatch(updateITSHistory(its))
		dispatch(updateITSPinnedHistory(its))
	})
export const updateUserContent = createAsync<void, void>(
	'updateUserContent',
	async (_, dispatch, getState) => {
		const state = getState()
		const { userQuery } = selectedSettings(state)
		const queries = userQuery.value
			.split(',')
			.map(q => ({
				text: q.trim()
			}))
		const userContent = await dispatch(getHistoryItems(queries))

		dispatch(updateUserHistory(userContent))
		dispatch(updateUserPinnedHistory(userContent))
	})
export const updateHistory = createAsync<void, void>(
	'updateHistory',
	async (_, dispatch) => {
		await Promise.all([
			dispatch(updateVCS()),
			dispatch(updateITS()),
			dispatch(updateUserContent()),
		])
	}
)
export const pinItem = createAction<HistoryItem['id']>('pinItem')
export const unpinItem = createAction<HistoryItem['id']>('unpinItem')
export const updateUserHistory = createAction<HistoryItem[]>('updateUserHistory')
export const updateUserPinnedHistory = createAction<HistoryItem[]>('updateUserPinnedHistory')
export const updateVCSHistory = createAction<VCSHistoryItem[]>('updateVCSHistory')
export const updateVCSPinnedHistory = createAction<VCSHistoryItem[]>('updateVCSPinnedHistory')
export const updateITSHistory = createAction<ITSHistoryItem[]>('updateITSHistory')
export const updateITSPinnedHistory = createAction<ITSHistoryItem[]>('updateITSPinnedHistory')
