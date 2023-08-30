import { ProcessConfig, VCSHistoryItem } from '../types'
import { getConfigTypes, getUrl } from '../helpers'

// TODO: add pipelines, graphs, analytics, jobs, issues, commits, tree, branches, tags, network, compare, settings, members, integrations, packages, repository
// TODO: move processors to separate files
export const gitlabProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	// TYPE: mergeRequest
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('merge_requests') && path.indexOf('merge_requests') !== path.length - 1
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'gitlab',
				type: 'mergeRequest',
				name: repoName,
				title: item.title?.split(' · ')[0] || '',
			}
		},
		{
			type: 'mergeRequest',
			name: 'Merge Request'
		}
	],
	// TYPE: filter (merge requests)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('merge_requests') && path.indexOf('merge_requests') === path.length - 1
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'gitlab',
				type: 'filter',
				name: repoName,
				title: 'Merge requests',
			}
		},
		{
			type: 'filter',
			name: 'Merge requests'
		}
	]
]

export const gitlabProcessConfigTypes = getConfigTypes(gitlabProcessConfig)
