import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => Boolean(item),
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		typeName: 'Unknown',
		name: '',
		title: item.title?.split(' - ')[0] || '',
		provider: 'jira',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
