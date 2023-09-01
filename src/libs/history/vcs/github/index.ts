import { ProcessConfig, VCSHistoryItem } from 'libs/history/types'
import { getConfigTypes } from 'libs/history/helpers'
import settings from 'libs/history/vcs/github/settings'
import topics from 'libs/history/vcs/github/topics'
import repo from 'libs/history/vcs/github/repo'
import pullRequest from 'libs/history/vcs/github/pullRequest'
import filterPullRequests from 'libs/history/vcs/github/filter-pullRequests'
import filterIssues from 'libs/history/vcs/github/filter-issues'
import filterSearch from 'libs/history/vcs/github/filter-search'
import blob from 'libs/history/vcs/github/blob'
import tree from 'libs/history/vcs/github/tree'

// TODO: add commits, releases, settings, notifications, orgs, pkgs
export const githubProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	settings,
	topics,
	repo,
	pullRequest,
	filterPullRequests,
	filterIssues,
	filterSearch,
	blob,
	tree,
]

export const githubProcessConfigTypes = getConfigTypes(githubProcessConfig)
