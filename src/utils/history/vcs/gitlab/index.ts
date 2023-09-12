import { ProcessConfig, VCSHistoryItem } from 'utils/history/types'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import jobs from 'utils/history/vcs/gitlab/jobs'
import pipelines from 'utils/history/vcs/gitlab/pipelines'
import commit from 'utils/history/vcs/gitlab/commit'

// TODO: add login, mergeRequestEdit, help, blob, graphs, analytics, issues, tree, branches, tags, network, compare, settings, members, integrations, packages, repository
export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	mergeRequest,
	filterMergeRequests,
	jobs,
	pipelines,
	commit,
]
