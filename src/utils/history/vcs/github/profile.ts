import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.length === 1
		&& !path[0].includes('search')
		&& !path[0].includes('issues')
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		provider: 'github',
		type: 'profile',
		name: 'profile',
		typeName: 'Profile',
		title: item.title?.split(' · ')[0] || 'Profile',
	}),
	{
		type: 'profile',
		name: 'Profile',
	}
]

export default processor
