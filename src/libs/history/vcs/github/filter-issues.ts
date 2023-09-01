import { getUrl } from 'libs/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('issues') && path.indexOf('issues') === path.length - 1
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			url,
			provider: 'github',
			type: 'filter',
			name: repoName,
			title: item.title?.replace(` · ${repoName}`, '') || 'Issues'
		}
	},
	{
		type: 'filter',
		name: 'Issues'
	}
]

export default processor