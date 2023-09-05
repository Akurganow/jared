import { ProcessConfig, VCSHistoryItem } from 'utils/history/types'
import { getConfigTypes } from 'utils/history/helpers'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import jobs from 'utils/history/vcs/gitlab/jobs'
import pipelines from 'utils/history/vcs/gitlab/pipelines'

// TODO: add help, blob, graphs, analytics, issues, commits, commit, tree, branches, tags, network, compare, settings, members, integrations, packages, repository
export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	mergeRequest,
	filterMergeRequests,
	jobs,
	pipelines,
]

export const gitlabProcessConfigTypes = getConfigTypes(gitlabProcessConfig)
