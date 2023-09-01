import { getUrl } from 'utils/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('pulls')
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
			title: 'Pull requests'
		}
	},
	{
		type: 'filter',
		name: 'Pull requests'
	}
]

export default processor
