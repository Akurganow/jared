import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('tree')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'tree',
			typeName: 'Tree',
			name: repoName,
			title: item.title?.split(' at ')[1] || ''
		}
	},
	{
		type: 'tree',
		name: 'Tree'
	}
]

export default processor
