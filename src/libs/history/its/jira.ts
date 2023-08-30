import { memoize } from 'lodash'
import { ProcessConfig, ITSHistoryItem } from '../types'
import { getConfigTypes, getUrl } from '../helpers'

function rawGetSplitTitle(title: string): string[] {
	const splitTitle = title?.split(' - ')

	splitTitle?.pop()

	return splitTitle
}

const getSplitTitle = memoize(rawGetSplitTitle)
// TODO: filter items from settings
// TODO: move processors to separate files
export const jiraProcessConfig: ProcessConfig<chrome.history.HistoryItem, ITSHistoryItem> = [
	// TYPE: issue
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'browse'
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const title = getSplitTitle(item.title || '')

			return {
				...item,
				url,
				type: 'issue',
				provider: 'jira',
				name: path[1],
				title: title?.join(' - ') || path[1],
			}
		},
		{
			type: 'issue',
			name: 'Issue'
		}
	],
	// TYPE: filter
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'issues'
		},
		(item: chrome.history.HistoryItem) => {
			const [url] = getUrl(item.url || '')
			const title = getSplitTitle(item.title || '')

			const filterName = title
				? title[0].replace(/^\[(.+)\].+/ig, '$1')
				: ''

			return {
				...item,
				url,
				type: 'filter',
				provider: 'jira',
				name: filterName,
				title: filterName,
			}
		},
		{
			type: 'filter',
			name: 'Issues'
		}
	],
	// TYPE: project
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'projects'
		},
		(item: chrome.history.HistoryItem) => {
			const [url, path] = getUrl(item.url || '')
			const projectName = path[1]

			return {
				...item,
				url,
				type: 'project',
				provider: 'jira',
				name: projectName,
				title: projectName,
			}
		},
		{
			type: 'project',
			name: 'Project'
		}
	],
	// TYPE: profile
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'secure' && path[1] === 'ViewProfile.jspa'
		},
		(item: chrome.history.HistoryItem) => {
			const [url] = getUrl(item.url || '')
			const title = getSplitTitle(item.title || '')
			const profileName = title[0].replace('User Profile: ', '')

			return {
				...item,
				url,
				type: 'profile',
				provider: 'jira',
				name: profileName,
				title: profileName,
			}
		},
		{
			type: 'profile',
			name: 'Profile'
		}
	],
	// TYPE: board (RapidBoard)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'secure' && path[1] === 'RapidBoard.jspa'
		},
		(item: chrome.history.HistoryItem) => {
			const [url] = getUrl(item.url || '')
			const title = getSplitTitle(item.title || '')
			const boardId = url.searchParams.get('rapidView') || ''

			return {
				...item,
				url,
				type: 'board',
				provider: 'jira',
				name: boardId,
				title: title.join(' ')
			}
		},
		{
			type: 'board',
			name: 'Board'
		}
	],
	// TYPE: board (Dashboard)
	[
		(item: chrome.history.HistoryItem) => {
			const [, path] = getUrl(item.url || '')

			return path[0] === 'secure' && path[1] === 'Dashboard.jspa'
		},
		(item: chrome.history.HistoryItem) => {
			const [url] = getUrl(item.url || '')
			const title = getSplitTitle(item.title || '')
			const name = title[0].replace('System Dashboard - ', '')

			return {
				...item,
				url,
				type: 'board',
				provider: 'jira',
				name,
				title: name,
			}
		},
		{
			type: 'board',
			name: 'Dashboard'
		}
	]
]

export const jiraProcessConfigTypes = getConfigTypes(jiraProcessConfig)
