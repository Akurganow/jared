import { getUrl } from 'utils/history/helpers'
import { ProcessConfigItem, VCSHistoryItem } from 'src/types/history'

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
