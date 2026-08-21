import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'
import { getUrl } from 'utils/history/helpers'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('search') && path[0] !== 'search'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'blob',
			typeName: 'Blob search',
			name: repoName,
			title: item.title?.split(' · ')[0] || '',
		}
	},
	{
		type: 'blob',
		name: 'Blob search',
	},
]

export default processor
