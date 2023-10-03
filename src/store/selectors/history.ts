import { createSelector } from 'reselect'
import { filterItems, filterDisabledItems, sortByLastVisitTime } from 'utils/history/helpers'
import { RootState } from 'store/types'
import { selectedDisabledTypes, selectedSettings } from 'store/selectors/settings'
import { storeKey } from 'store/constants/history'

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
	selectedPinnedITSItems,
	(items, pinned) => (id: string) =>
		[...items, ...pinned].find(item => item.id === id)
)
export const selectedVCSItemById = createSelector(
	rawSelectedVCSItems,
	selectedPinnedVCSItems,
	(items, pinned) => (id: string) =>
		[...items, ...pinned].find(item => item.id === id)
)
export const selectedVCS = createSelector(
	rawSelectedVCSItems,
	selectedPinnedVCSItems,
	selectedSettings,
	selectedDisabledTypes,
	(items, pinned, settings, disabled) => {
		const maxResults = settings.maxResults.value
		const filtered = items
			.filter(filterItems(pinned))
			.filter(filterDisabledItems(disabled))
			.sort(sortByLastVisitTime)

		return [...pinned, ...filtered].slice(0, maxResults)
	}
)

export const selectedITS = createSelector(
	rawSelectedITSItems,
	selectedPinnedITSItems,
	selectedSettings,
	selectedDisabledTypes,
	(items, pinned, settings, disabled) => {
		const maxResults = settings.maxResults.value
		const filtered = items
			.filter(filterItems(pinned))
			.filter(filterDisabledItems(disabled))
			.sort(sortByLastVisitTime)

		return [...pinned, ...filtered].slice(0, maxResults)
	}
)
export const selectedUserContentItems = createSelector(
	rawSelectedMainItems,
	selectedPinnedUserContentItems,
	selectedPinnedVCSItems,
	selectedPinnedITSItems,
	selectedVCSItemById,
	selectedITSItemById,
	selectedSettings,
	(main, pinned, pinnedVCS, pinnedITS, getVCS, getITS, settings) => {
		const maxResults = settings.maxResults.value
		const filtered = main
			.filter(filterItems([...pinned]))
			.filter((item, index, array) => {
				const foundInVCS = getVCS(item.id)
				const foundInITS = getITS(item.id)

				return !foundInVCS && !foundInITS
					&& item.title
					&& array.findIndex(i => i.title === item.title) === index
			})

		return [...pinned, ...filtered].slice(0, maxResults)
	}
)
