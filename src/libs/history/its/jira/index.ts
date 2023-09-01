import { ProcessConfig, ITSHistoryItem } from 'libs/history/types'
import { getConfigTypes } from 'libs/history/helpers'
import issue from 'libs/history/its/jira/issue'
import filter from 'libs/history/its/jira/filter'
import project from 'libs/history/its/jira/project'
import profile from 'libs/history/its/jira/profile'
import rapidBoard from 'libs/history/its/jira/rapidBoard'
import dashboard from 'libs/history/its/jira/dashboard'

// TODO: filter items from settings
export const jiraProcessConfig: ProcessConfig<chrome.history.HistoryItem, ITSHistoryItem> = [
	issue,
	filter,
	project,
	profile,
	rapidBoard,
	dashboard,
]

export const jiraProcessConfigTypes = getConfigTypes(jiraProcessConfig)
