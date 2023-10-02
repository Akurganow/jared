import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.length === 2
		&& !path.includes('topics')
		&& !path.includes('settings')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'repository',
			typeName: 'Repository',
			name: repoName,
			title: item.title?.split(' · ')[0] || repoName,
		}
	},
	{
		type: 'repository',
		name: 'Repository'
	}
]

export default processor
