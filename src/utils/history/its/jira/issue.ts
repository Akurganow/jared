import { getUrl, getSplitTitle } from 'utils/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'browse'
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')

		return {
			...item,
			url,
			type: 'issue',
			provider: 'jira',
			name: path[1],
			title: title?.join(' - ') || path[1],
		}
	},
	{
		type: 'issue',
		name: 'Issue'
	}
]

export default processor
