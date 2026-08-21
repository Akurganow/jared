import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'
import { getUrl } from 'utils/history/helpers'
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

const knownProcessors = [
	tree[0],
	topics[0],
	settings[0],
	repository[0],
	pullRequest[0],
	profile[0],
	issue[0],
	filterSearch[0],
	filterPullRequests[0],
	filterIssues[0],
	blobSearch[0],
	blob[0],
]

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')
		return path.length > 2 && knownProcessors.every((processor) => !processor(item))
	},
	(item: chrome.history.HistoryItem) => ({
		...item,
		type: 'unknown',
		typeName: 'Unknown',
		provider: 'github',
		name: '',
		title: item.title || '',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
