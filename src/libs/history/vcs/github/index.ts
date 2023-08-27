import { ProcessConfig, VCSHistoryItem } from 'libs/history/types'
import { getConfigTypes, getUrl } from 'libs/history/helpers'
import processor from 'libs/history/vcs/github/settings'

// TODO: add commits, releases, settings, notifications, orgs, pkgs
export const githubProcessConfig: ProcessConfig<chrome.history.HistoryItem, VCSHistoryItem> = [
	processor,
	// TYPE: topics
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'topics'
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')

			return {
				...item,
				url,
				provider: 'github',
				type: 'topics',
				name: '',
				title: `${item.title?.replace(' · GitHub Topics', '') || path[0]}`,
			}
		},
		{
			type: 'topics',
			name: 'Topics',
		}
	],
	// TYPE: repo
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.length === 2
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'repo',
				name: repoName,
				title: item.title?.replace(`${repoName}: `, '') || repoName,
			}
		},
		{
			type: 'repo',
			name: 'Repository'
		}
	],
	// TYPE: pullRequest
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('pull')
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'pullRequest',
				name: repoName,
				title: item.title?.split(' · ')[0] || `Pull request #${path[path.length - 1]}`
			}
		},
		{
			type: 'pullRequest',
			name: 'Pull request'
		}
	],
	// TYPE: filter (pull requests)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('pulls')
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'filter',
				name: repoName,
				title: 'Pull requests'
			}
		},
		{
			type: 'filter',
			name: 'Pull requests'
		}
	],
	// TYPE: filter (issues)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('issues') && path.indexOf('issues') === path.length - 1
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'filter',
				name: repoName,
				title: item.title?.replace(` · ${repoName}`, '') || 'Issues'
			}
		},
		{
			type: 'filter',
			name: 'Issues'
		}
	],
	// TYPE: filter (search)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('search')
		},
		(item: chrome.history.HistoryItem) => {
			const [url] = getUrl(item.url || '')

			return {
				...item,
				url,
				provider: 'github',
				type: 'filter',
				name: 'Search',
				title: item.title || 'Search'
			}
		},
		{
			type: 'filter',
			name: 'Search'
		}
	],
	// TYPE: blob
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('search')
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'blob',
				name: repoName,
				title: item.title?.replace(` · ${repoName}`, '') || ''
			}
		},
		{
			type: 'blob',
			name: 'Blob'
		}
	],
	// TYPE: tree
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path.includes('tree')
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const repoName = `${path[0]}/${path[1]}`

			return {
				...item,
				url,
				provider: 'github',
				type: 'tree',
				name: repoName,
				title: item.title?.replace(` · ${repoName}`, '') || ''
			}
		},
		{
			type: 'tree',
			name: 'Tree'
		}
	]
]

export const githubProcessConfigTypes = getConfigTypes(githubProcessConfig)
