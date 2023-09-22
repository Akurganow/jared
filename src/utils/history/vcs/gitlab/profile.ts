import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.length === 1
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		provider: 'gitlab',
		type: 'profile',
		name: 'profile',
		title: item.title?.split(' · ')[0] || 'Profile',
	}),
	{
		type: 'profile',
		name: 'Profile',
	}
]

export default processor
