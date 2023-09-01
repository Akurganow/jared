import { getUrl, getSplitTitle } from 'libs/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'RapidBoard.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')
		const boardId = url.searchParams.get('rapidView') || ''

		return {
			...item,
			url,
			type: 'board',
			provider: 'jira',
			name: boardId,
			title: title.join(' ')
		}
	},
	{
		type: 'board',
		name: 'Board'
	}
]

export default processor
