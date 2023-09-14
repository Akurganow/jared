import { ITSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => Boolean(item),
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		name: '',
		title: item.title || '',
		provider: 'jira',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
