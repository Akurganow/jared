import { getUrl } from 'utils/history/helpers'
import { ProcessConfigItem, VCSHistoryItem } from 'utils/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('pipelines') && item.title?.split(' · ')[0] === 'Pipeline'
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			url,
			provider: 'gitlab',
			type: 'pipeline',
			name: repoName,
			title: `${item.title?.split(' · ')[0]} ${path[path.length - 1]}` || 'Pipeline',
		}
	},
	{
		type: 'pipeline',
		name: 'Pipelines',
	}
]

export default processor
