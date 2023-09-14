import { getUrl } from 'utils/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('search')
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		provider: 'github',
		type: 'filter',
		name: 'Search',
		title: item.title || 'Search'
	}),
	{
		type: 'filter',
		name: 'Search'
	}
]

export default processor
