import { getUrl } from 'libs/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('merge_requests') && path.indexOf('merge_requests') !== path.length - 1
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			url,
			provider: 'gitlab',
			type: 'mergeRequest',
			name: repoName,
			title: item.title?.split(' · ')[0] || '',
		}
	},
	{
		type: 'mergeRequest',
		name: 'Merge Request'
	}
]

export default processor
