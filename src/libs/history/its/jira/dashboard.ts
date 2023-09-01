import { getUrl, getSplitTitle } from 'libs/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'Dashboard.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')
		const name = title[0].replace('System Dashboard - ', '')

		return {
			...item,
			url,
			type: 'board',
			provider: 'jira',
			name,
			title: name,
		}
	},
	{
		type: 'board',
		name: 'Dashboard'
	}
]

export default processor
