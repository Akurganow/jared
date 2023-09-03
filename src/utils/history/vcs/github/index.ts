import { ProcessConfig, VCSHistoryItem } from 'utils/history/types'
import { getConfigTypes } from 'utils/history/helpers'
import settings from 'utils/history/vcs/github/settings'
import topics from 'utils/history/vcs/github/topics'
import repo from 'utils/history/vcs/github/repo'
import pullRequest from 'utils/history/vcs/github/pullRequest'
import filterPullRequests from 'utils/history/vcs/github/filter-pullRequests'
import filterIssues from 'utils/history/vcs/github/filter-issues'
import filterSearch from 'utils/history/vcs/github/filter-search'
import blobSearch from 'utils/history/vcs/github/blob-search'
import tree from 'utils/history/vcs/github/tree'

// TODO: add commits, releases, settings, notifications, orgs, pkgs
export const githubProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	settings,
	topics,
	repo,
	pullRequest,
	filterPullRequests,
	filterIssues,
	filterSearch,
	blobSearch,
	tree,
]

export const githubProcessConfigTypes = getConfigTypes(githubProcessConfig)
