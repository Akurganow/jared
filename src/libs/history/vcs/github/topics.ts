import { getUrl } from 'libs/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'topics'
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')

		return {
			...item,
			url,
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
