import { getUrl } from 'utils/history/helpers'
import { ProcessConfigItem, VCSHistoryItem } from 'src/types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'settings'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const repoName = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'github',
			type: 'settings',
			name: repoName,
			title: `${item.title || path[1]}`,
		}
	},
	{
		type: 'settings',
		name: 'Settings'
	}
]
export default processor
