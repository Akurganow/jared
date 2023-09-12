import { ProcessConfigItem, VCSHistoryItem } from 'utils/history/types'
import { getUrl } from 'utils/history/helpers'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('blob')
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			url,
			provider: 'github',
			type: 'blob',
			name: repoName,
			title: item.title?.split(' · ')[0] || 'Blob'
		}
	},
	{
		type: 'blob',
		name: 'Blob',
	}
]

export default processor
