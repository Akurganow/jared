import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'topics'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return {
			...item,
			provider: 'github',
			type: 'topics',
			name: '',
			title: `${item.title?.replace(' · GitHub Topics', '') || path[0]}`,
		}
	},
	{
		type: 'topics',
		name: 'Topics',
	}
]

export default processor
