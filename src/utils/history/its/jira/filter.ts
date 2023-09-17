import { getUrl, getSplitTitle } from 'utils/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'issues'
	},
	(item: chrome.history.HistoryItem) => {
		const [url] = getUrl(item.url || '')
		const title = getSplitTitle(item.title || '')
		const filterId = url.searchParams.get('filter') || ''

		const filterName = title
			? title[0].replace(/^[(.+)].+/ig, '$1')
			: ''

		return {
			...item,
			type: 'filter',
			provider: 'jira',
			name: filterId ? `filter #${filterId}` : 'filter',
			title: filterName,
		}
	},
	{
		type: 'filter',
		name: 'Issues'
	}
]

export default processor
