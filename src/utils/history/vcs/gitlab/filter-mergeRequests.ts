import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('merge_requests') && path.indexOf('merge_requests') === path.length - 1
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'gitlab',
			type: 'filter',
			name: repoName,
			title: 'Merge requests',
		}
	},
	{
		type: 'pipeline',
		name: 'Merge requests'
	}
]

export default processor
