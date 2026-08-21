import type { ProcessConfig, VCSHistoryItem } from 'types/history'
import blob from 'utils/history/vcs/github/blob'
import blobSearch from 'utils/history/vcs/github/blob-search'
import filterIssues from 'utils/history/vcs/github/filter-issues'
import filterPullRequests from 'utils/history/vcs/github/filter-pullRequests'
import filterSearch from 'utils/history/vcs/github/filter-search'
import issue from 'utils/history/vcs/github/issue'
import profile from 'utils/history/vcs/github/profile'
import pullRequest from 'utils/history/vcs/github/pullRequest'
import repository from 'utils/history/vcs/github/repository'
import settings from 'utils/history/vcs/github/settings'
import topics from 'utils/history/vcs/github/topics'
import tree from 'utils/history/vcs/github/tree'
import unknown from 'utils/history/vcs/github/unknown'

// TODO: split files into namespaces folders like: src/utils/history/vcs/github/actions/workflows.ts
/*
 TODO: add missing handlers
 import commits from 'utils/history/vcs/github/commits'
 import releases from 'utils/history/vcs/github/releases'
 import notifications from 'utils/history/vcs/github/notifications'
 import orgs from 'utils/history/vcs/github/orgs'
 import pkgs from 'utils/history/vcs/github/pkgs'
 import settings from 'utils/history/vcs/github/settings'
 import tabs from 'utils/history/vcs/github/tabs'
 import runs from 'utils/history/vcs/github/runs'
 import workflows from 'utils/history/vcs/github/workflows'
 import runners from 'utils/history/vcs/github/runners'
 import caches from 'utils/history/vcs/github/caches'
 import projects from 'utils/history/vcs/github/projects'
 */

export const githubProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	profile,
	issue,
	settings,
	topics,
	pullRequest,
	filterPullRequests,
	filterIssues,
	filterSearch,
	blobSearch,
	tree,
	blob,
	repository,
	unknown,
]
