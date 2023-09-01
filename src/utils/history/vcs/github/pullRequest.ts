import { getUrl } from 'utils/history/helpers'
import { VCSHistoryItem, ProcessConfigItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('pull')
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			url,
			provider: 'github',
			type: 'pullRequest',
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
