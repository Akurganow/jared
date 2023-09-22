import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.length === 2
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		console.log('repoName', repoName)

		return {
			...item,
			provider: 'gitlab',
			type: 'repo',
			name: repoName,
			title: item.title?.split(' · ')[0].replace(`${repoName}: `, '') || repoName,
		}
	},
	{
		type: 'repo',
		name: 'Repository'
	}
]

export default processor
