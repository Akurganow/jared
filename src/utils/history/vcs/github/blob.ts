
import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('blob')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`
		const splitTitle = item.title?.split(' at ')
		const title = splitTitle
			? splitTitle[0].split('/')[1] + ` at ${splitTitle[1].split(' · ')[0]}`
			: item.title?.split(' · ')[0] || 'Blob'

		return {
			...item,
			provider: 'github',
			type: 'blob',
			typeName: 'Blob',
			name: repoName,
			title,
		}
	},
	{
		type: 'blob',
		name: 'Blob',
	}
]

export default processor
