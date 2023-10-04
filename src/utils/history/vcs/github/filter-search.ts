import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('search')
		&& path[0] === 'search'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')

		return {
			...item,
			provider: 'github',
			type: 'filter',
			typeName: 'Search',
			name: `Search ${url?.searchParams.get('q')}`.trim(),
			title: item.title || 'Search'
		}
	},
	{
		type: 'filter',
		name: 'Search'
	}
]

export default processor
