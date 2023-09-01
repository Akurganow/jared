import { createSelector } from 'reselect'
import { RootState } from 'store/types'
import { filterItems } from 'store/helpers/history'
import { sortByLastVisitTime, sortByVisitCount } from 'libs/history/helpers'
import { processITS } from 'libs/history/its'
import { processVCS } from 'libs/history/vcs'
import { storeKey } from 'store/reducers/history'
import { selectedSettings } from 'store/selectors/settings'

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
	selectedSettings,
	(items, pinned, settings) => {
		const maxResults = settings.maxResults.value
		const filtered = items.filter(filterItems(pinned)).sort(sortByLastVisitTime)

		return [...pinned, ...filtered]
			.slice(0, maxResults)
			.map(processVCS)
	}
)
export const selectedITS = createSelector(
	rawSelectedITSItems,
	selectedPinnedITSItems,
	selectedSettings,
	(items, pinned, settings) => {
		const maxResults = settings.maxResults.value
		const filtered = items.filter(filterItems(pinned)).sort(sortByVisitCount)

		return [...pinned, ...filtered]
			.slice(0, maxResults)
			.map(processITS)
	}
)
export const selectedUserContentItems = createSelector(
	rawSelectedMainItems,
	selectedVCSItemById,
	selectedITSItemById,
	selectedSettings,
	(main, getVCS, getITS, settings) => main
		.filter((item, index, array) => {
			const foundInVCS = getVCS(item.id)
			const foundInITS = getITS(item.id)

			return !foundInVCS && !foundInITS
				&& array.findIndex(i => i.title === item.title) === index
		})
		.slice(0, settings.maxResults.value)
)