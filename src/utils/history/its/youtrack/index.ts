import { getConfigTypes } from 'utils/history/helpers'
import unknown from 'utils/history/its/jira/unknown'
import issue from 'utils/history/its/youtrack/issue'
import type { ITSHistoryItem, ProcessConfig } from 'types/history'

export const youtrackProcessConfig: ProcessConfig<chrome.history.HistoryItem, ITSHistoryItem> = [
	issue,
	unknown,
]

export const youtrackProcessConfigTypes = getConfigTypes(youtrackProcessConfig)
