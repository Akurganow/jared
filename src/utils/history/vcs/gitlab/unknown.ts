import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'
import { getUrl } from 'utils/history/helpers'
import commit from 'utils/history/vcs/gitlab/commit'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import jobs from 'utils/history/vcs/gitlab/jobs'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import pipelines from 'utils/history/vcs/gitlab/pipelines'
import profile from 'utils/history/vcs/gitlab/profile'
import repository from 'utils/history/vcs/gitlab/repository'
import tree from 'utils/history/vcs/gitlab/tree'

const knownProcessors = [
	tree[0],
	repository[0],
	profile[0],
	pipelines[0],
	mergeRequest[0],
	jobs[0],
	filterMergeRequests[0],
	commit[0],
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
		provider: 'gitlab',
		name: '',
		title: item.title || '',
	}),
	{
		type: 'unknown',
		name: 'Unknown',
	},
]

export default processor
