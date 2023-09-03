import { ProcessConfig, VCSHistoryItem } from 'utils/history/types'
import { getConfigTypes } from 'utils/history/helpers'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'

// TODO: add help, blob, pipelines, graphs, analytics, jobs, issues, commits, commit, tree, branches, tags, network, compare, settings, members, integrations, packages, repository
export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	mergeRequest,
	filterMergeRequests,
]

export const gitlabProcessConfigTypes = getConfigTypes(gitlabProcessConfig)
