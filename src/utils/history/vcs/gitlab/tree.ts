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
		const splitTitle = item.title?.split(' · ') || []

		return {
			...item,
			provider: 'github',
			type: 'tree',
			name: repoName,
			title: `${splitTitle[0]} ${splitTitle[1]}`
		}
	},
	{
		type: 'tree',
		name: 'Tree',
	}
]

export default processor
