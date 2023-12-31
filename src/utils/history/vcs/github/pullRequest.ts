import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('pull')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'pullRequest',
			typeName: 'Pull request',
			name: repoName,
			title: item.title?.split(' · ')[0] || `Pull request #${path[path.length - 1]}`
		}
	},
	{
		type: 'pullRequest',
		name: 'Pull request'
	}
]

export default processor
