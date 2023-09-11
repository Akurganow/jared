import memoize from 'lodash/memoize'
import { HistoryItem } from 'store/types/history'
import { gitlabProcessConfig } from 'utils/history/vcs/gitlab'
import { githubProcessConfig } from 'utils/history/vcs/github'

const configs = {
	gitlab: gitlabProcessConfig,
	github: githubProcessConfig,
}
export const getVCSQueries = memoize((query: string) => {
	const lines = query
		.split('\n')
		.filter(Boolean)
		.map((line) => {
			const [type, query] = line.trim().split(' ')
			const config = configs[type as keyof typeof configs]

			return [
				config,
				query,
				!config ? new Error(`Unknown type: ${type}`) : null
			]
		})

	return lines
})
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
