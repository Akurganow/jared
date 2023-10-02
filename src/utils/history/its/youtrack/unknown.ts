import issue from './issue'
import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const knownProcessors = [
	issue[0],
]

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		return Boolean(item)
		&& knownProcessors.every(processor => !processor(item))
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		typeName: 'Unknown',
		name: '',
		title: item.title || '',
		provider: 'youtrack',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
