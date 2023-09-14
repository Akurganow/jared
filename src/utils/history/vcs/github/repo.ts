import { getUrl } from 'utils/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.length === 2
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'repo',
			name: repoName,
			title: item.title?.replace(`${repoName}: `, '') || repoName,
		}
	},
	{
		type: 'repo',
		name: 'Repository'
	}
]

export default processor
