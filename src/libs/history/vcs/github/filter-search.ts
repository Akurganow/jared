import { getUrl } from 'libs/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('search')
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')

		return {
			...item,
			url,
			provider: 'github',
			type: 'filter',
			name: 'Search',
			title: item.title || 'Search'
		}
	},
	{
		type: 'filter',
		name: 'Search'
	}
]

export default processor
