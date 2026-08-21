import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'
import { getSplitTitle, getUrl } from 'utils/history/helpers'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'ViewProfile.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const title = getSplitTitle(item.title || '')
		const profileName = title[0].replace('User Profile: ', '')

		return {
			...item,
			type: 'profile',
			typeName: 'Profile',
			provider: 'jira',
			name: profileName,
			title: profileName,
		}
	},
	{
		type: 'profile',
		name: 'Profile',
	},
]

export default processor
