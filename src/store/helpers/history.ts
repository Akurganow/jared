import memoize from 'lodash/memoize'
import { HistoryItem, HistoryQuery } from 'store/types/history'
import { gitlabProcessConfig } from 'utils/history/vcs/gitlab'
import { githubProcessConfig } from 'utils/history/vcs/github'
import { jiraProcessConfig } from 'utils/history/its/jira'

const vcsConfigs = {
	gitlab: gitlabProcessConfig,
	github: githubProcessConfig,
}
const itsConfigs = {
	jira: jiraProcessConfig,
}
export const getVCSQueries = memoize((query: string) =>
	query
		.split('\n')
		.filter(Boolean)
		.map((line): HistoryQuery => {
			const [query, type, maxResults] = line.trim().split(' ')
			const config = vcsConfigs[type as keyof typeof vcsConfigs]

			return {
				type: type as HistoryQuery['type'],
				text: query,
				maxResults: parseInt(maxResults, 10),
				...(!config ? { error: new Error(`Unknown type: ${type}`) } : {}),
			}
		})
)
export const getITSQueries = memoize((query: string) =>
	query
		.split('\n')
		.filter(Boolean)
		.map((line): HistoryQuery => {
			const [query, type, maxResults] = line.trim().split(' ')
			const config = itsConfigs[type as keyof typeof itsConfigs]

			return {
				type: type as HistoryQuery['type'],
				text: query,
				maxResults: parseInt(maxResults, 10),
				...(!config ? { error: new Error(`Unknown type: ${type}`) } : {}),
			}
		})
)
export function filterItems(pinned: HistoryItem[]) {
	return (item: HistoryItem, index: number, array: HistoryItem[]) =>
		array.findIndex(i => i.title === item.title) === index
		&& !pinned.find(pinnedItem => pinnedItem.title === item.title)
}

export function movePinnedItemBetweenArrays(arrFrom: HistoryItem[], arrTo: HistoryItem[], id: HistoryItem['id'], pinned: boolean) {
	const item = arrFrom.find(item => item.id === id)

	return item
		? [
			arrFrom.filter(item => item.id !== id),
			[...arrTo, { ...item, pinned }],
		]
		: [arrFrom, arrTo]
}
