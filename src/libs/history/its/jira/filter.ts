import { getUrl, getSplitTitle } from 'libs/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'issues'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')

		const filterName = title
			? title[0].replace(/^[(.+)].+/ig, '$1')
			: ''

		return {
			...item,
			url,
			type: 'filter',
			provider: 'jira',
			name: filterName,
			title: filterName,
		}
	},
	{
		type: 'filter',
		name: 'Issues'
	}
]

export default processor
