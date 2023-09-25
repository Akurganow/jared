import { getUrl } from 'utils/history/helpers'
import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path[0] === 'projects'
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		const projectName = path[1]

		return {
			...item,
			type: 'project',
			typeName: 'Project',
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
