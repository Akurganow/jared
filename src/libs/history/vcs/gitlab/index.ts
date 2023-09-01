import { ProcessConfig, VCSHistoryItem } from 'libs/history/types'
import { getConfigTypes } from 'libs/history/helpers'
import mergeRequest from 'libs/history/vcs/gitlab/mergeRequest'
import filterMergeRequests from 'libs/history/vcs/gitlab/filter-mergeRequests'

// TODO: add pipelines, graphs, analytics, jobs, issues, commits, tree, branches, tags, network, compare, settings, members, integrations, packages, repository
export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	mergeRequest,
	filterMergeRequests,
]

export const gitlabProcessConfigTypes = getConfigTypes(gitlabProcessConfig)
