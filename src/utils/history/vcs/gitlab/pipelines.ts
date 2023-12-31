import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('pipelines') && item.title?.split(' · ')[0] === 'Pipeline'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'gitlab',
			type: 'pipeline',
			typeName: 'Pipelines',
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
