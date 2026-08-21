import type { ITSHistoryItem, ProcessConfig } from 'types/history'
import { getConfigTypes } from 'utils/history/helpers'
import dashboard from 'utils/history/its/jira/dashboard'
import filter from 'utils/history/its/jira/filter'
import issue from 'utils/history/its/jira/issue'
import profile from 'utils/history/its/jira/profile'
import project from 'utils/history/its/jira/project'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import unknown from 'utils/history/its/jira/unknown'

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
