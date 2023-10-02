import dashboard from 'utils/history/its/jira/dashboard'
import filter from 'utils/history/its/jira/filter'
import issue from 'utils/history/its/jira/issue'
import profile from 'utils/history/its/jira/profile'
import project from 'utils/history/its/jira/project'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import type { ITSHistoryItem, ProcessConfigItem } from 'types/history'

const knownProcessors = [
	dashboard[0],
	filter[0],
	issue[0],
	profile[0],
	project[0],
	rapidBoard[0],
]

const processor: ProcessConfigItem<chrome.history.HistoryItem, ITSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		return Boolean(item)
		&& knownProcessors.every(processor => !processor(item))
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		typeName: 'Unknown',
		name: '',
		title: item.title?.split(' - ')[0] || '',
		provider: 'jira',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
