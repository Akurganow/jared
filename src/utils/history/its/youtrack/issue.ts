import { getUrl } from 'utils/history/helpers'
import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'issue'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const title = item.title?.split(': ')[0]

		return {
			...item,
			type: 'issue',
			typeName: 'Issue',
			provider: 'youtrack',
			name: path[1],
			title: title || path[1],
		}
	},
	{
		type: 'issue',
		name: 'Issue'
	}
]

export default processor
