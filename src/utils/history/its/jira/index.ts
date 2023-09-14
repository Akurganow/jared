import { ProcessConfig, ITSHistoryItem } from 'utils/history/types'
import { getConfigTypes } from 'utils/history/helpers'
import issue from 'utils/history/its/jira/issue'
import filter from 'utils/history/its/jira/filter'
import project from 'utils/history/its/jira/project'
import profile from 'utils/history/its/jira/profile'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import dashboard from 'utils/history/its/jira/dashboard'
import unknown from 'utils/history/its/jira/unknown'

// TODO: filter items from settings
export const jiraProcessConfig: ProcessConfig<chrome.history.HistoryItem, ITSHistoryItem> = [
	issue,
	filter,
	project,
	profile,
	rapidBoard,
	dashboard,
	unknown,
]

export const jiraProcessConfigTypes = getConfigTypes(jiraProcessConfig)
