import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('issues') && path.indexOf('issues') === path.length - 1
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'filter',
			typeName: 'Issues',
			name: repoName,
			title: item.title?.split(' · ')[0] || 'Issues'
		}
	},
	{
		type: 'filter',
		name: 'Issues'
	}
]

export default processor
