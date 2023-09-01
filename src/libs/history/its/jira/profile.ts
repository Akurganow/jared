import { getUrl, getSplitTitle } from 'libs/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'secure' && path[1] === 'ViewProfile.jspa'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')
		const profileName = title[0].replace('User Profile: ', '')

		return {
			...item,
			url,
			type: 'profile',
			provider: 'jira',
			name: profileName,
			title: profileName,
		}
	},
	{
		type: 'profile',
		name: 'Profile'
	}
]

export default processor
