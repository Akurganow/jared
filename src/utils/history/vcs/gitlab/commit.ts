import { getUrl } from 'utils/history/helpers'
import { ProcessConfigItem, VCSHistoryItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('commit')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const name = `${path[0]}/${path[1]}`

		return {
			...item,
			provider: 'gitlab',
			type: 'commit',
			name,
			title: item.title?.split(' · ')[0] || 'Commit',
		}
	},
	{
		type: 'commit',
		name: 'Commit',
	}
]

export default processor
