
import { getUrl } from 'utils/history/helpers'
import { ProcessConfigItem, VCSHistoryItem } from 'src/types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('blob')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
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
