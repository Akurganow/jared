import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'
import { getSplitTitle, getUrl } from 'utils/history/helpers'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'browse'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')
			.join(' - ')
			.replace(`[${path[1]}]`, '')
			.trim()

		return {
			...item,
			type: 'issue',
			typeName: 'Issue',
			provider: 'jira',
			name: path[1],
			title: title || path[1],
		}
	},
	{
		type: 'issue',
		name: 'Issue',
	},
]

export default processor
