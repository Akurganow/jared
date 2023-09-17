import { getUrl, getSplitTitle } from 'utils/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'Dashboard.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const title = getSplitTitle(item.title || '')
		const name = title[0].replace('System Dashboard - ', '')

		return {
			...item,
			type: 'board',
			provider: 'jira',
			name: 'board',
			title: name,
		}
	},
	{
		type: 'board',
		name: 'Dashboard'
	}
]

export default processor
