
import { ProcessConfigItem, VCSHistoryItem } from 'src/types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => Boolean(item),
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		provider: 'github',
		name: '',
		title: item.title || '',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	}
]

export default processor
