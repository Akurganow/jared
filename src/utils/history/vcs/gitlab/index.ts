import { ProcessConfig, VCSHistoryItem } from 'types/history'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import jobs from 'utils/history/vcs/gitlab/jobs'
import pipelines from 'utils/history/vcs/gitlab/pipelines'
import commit from 'utils/history/vcs/gitlab/commit'
import unknown from 'utils/history/vcs/gitlab/unknown'
import profile from 'utils/history/vcs/gitlab/profile'
import tree from 'utils/history/vcs/gitlab/tree'

/*
TODO: add missing handlers
import settings from 'utils/history/vcs/gitlab/settings'
import blob from 'utils/history/vcs/gitlab/blob'
import issues from 'utils/history/vcs/gitlab/issues'
import branches from 'utils/history/vcs/gitlab/branches'
import analytics from 'utils/history/vcs/gitlab/analytics'
import snippets from 'utils/history/vcs/gitlab/snippets'
import tags from 'utils/history/vcs/gitlab/tags'
import help from 'utils/history/vcs/gitlab/help'
import graphs from 'utils/history/vcs/gitlab/graphs'
import login from 'utils/history/vcs/gitlab/login'
import mergeRequestEdit from 'utils/history/vcs/gitlab/mergeRequestEdit'
import network from 'utils/history/vcs/gitlab/network'
import compare from 'utils/history/vcs/gitlab/compare'
import members from 'utils/history/vcs/gitlab/members'
import integrations from 'utils/history/vcs/gitlab/integrations'
import packages from 'utils/history/vcs/gitlab/packages'
import repository from 'utils/history/vcs/gitlab/repository'
*/

export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	profile,
	tree,
	mergeRequest,
	filterMergeRequests,
	jobs,
	pipelines,
	commit,
	unknown,
]
