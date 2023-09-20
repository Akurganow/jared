import { actionCreatorFactory } from 'typescript-fsa'
import { asyncFactory } from 'typescript-fsa-redux-thunk'
import { RootState } from 'store/types'
import { HistoryItem, HistoryQuery, ITSHistoryItem, VCSHistoryItem } from 'types/history'
import { selectedSettings } from 'store/selectors/settings'
import { storeKey } from 'store/constants/history'
import { createHistoryItemProcessor } from 'utils/history'
import { getITSQueries, getVCSQueries } from 'utils/history/configs'

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

		for (const key of queries) {
			const query: chrome.history.HistoryQuery = {
				maxResults: (key.maxResults || maxResults.value) * 2, // double the max results to account for duplicates
				text: key.text,
				startTime: oneWeekAgo,
			}

			if (key.type) {
				const itemProcessor = createHistoryItemProcessor(key.type)
				const results = (await chrome.history.search(query))
					.map(itemProcessor)

				items.push(...results)
			} else {
				const results = (await chrome.history.search(query))
				items.push(...results as HistoryItem[])
			}
		}

		return items
			.filter((value, index, array) =>
				array.indexOf(value) === index
			)
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
	})
export const updateHistory = createAsync<void, void>(
	'updateHistory',
	async (_, dispatch) => {
		await dispatch(updateVCS())
		await dispatch(updateITS())
		await dispatch(updateUserContent())
	}
)
export const pinItem = createAction<HistoryItem['id']>('pinItem')
export const unpinItem = createAction<HistoryItem['id']>('unpinItem')
export const updateUserHistory = createAction<HistoryItem[]>('updateUserHistory')
export const updateVCSHistory = createAction<VCSHistoryItem[]>('updateVCSHistory')
export const updateVCSPinnedHistory = createAction<VCSHistoryItem[]>('updateVCSPinnedHistory')
export const updateITSHistory = createAction<ITSHistoryItem[]>('updateITSHistory')
export const updateITSPinnedHistory = createAction<ITSHistoryItem[]>('updateITSPinnedHistory')
