import { getUrl, getSplitTitle } from 'utils/history/helpers'
import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'Dashboard.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const title = getSplitTitle(item.title || '')

		return {
			...item,
			type: 'board',
			typeName: 'Dashboard',
			provider: 'jira',
			name: 'board',
			title: title[0],
		}
	},
	{
		type: 'board',
		name: 'Dashboard'
	}
]

export default processor
