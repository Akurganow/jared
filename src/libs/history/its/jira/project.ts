import { getUrl } from 'libs/history/helpers'
import { ITSHistoryItem, ProcessConfigItem } from 'libs/history/types'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'projects'
	},
	(item: chrome.history.HistoryItem) => {
		const [url, path] = getUrl(item.url || '')
		const projectName = path[1]

		return {
			...item,
			url,
			type: 'project',
			provider: 'jira',
			name: projectName,
			title: projectName,
		}
	},
	{
		type: 'project',
		name: 'Project'
	}
]

export default processor
