import memoize from 'lodash/memoize'
import type { HistoryItem, ProcessConfig } from 'types/history'

function rawGetUrl(itemUrl: string): [URL, string[]] {
	const url = new URL(itemUrl)
	const path = url.pathname.split('/').filter(Boolean)

	return [
		url,
		path,
	]
}
export const getUrl = memoize(rawGetUrl)

function rawGetSplitTitle(title: string): string[] {
	const splitTitle = title?.split(' - ')

	splitTitle?.pop()

	return splitTitle
}
export const getSplitTitle = memoize(rawGetSplitTitle)


export function getConfigTypes<T = unknown, R = unknown>(config: ProcessConfig<T , R>) {
	return config.map(([, , type]) => type)
}

function sortBy(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem, key: 'lastVisitTime' | 'visitCount') {
	return (b[key] || 0) - (a[key] || 0)
}

export function sortByVisitCount(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'visitCount')
}

export function sortByLastVisitTime(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'lastVisitTime')
}

export function filterItems(pinned: HistoryItem[]) {
	return (item: HistoryItem, index: number, array: HistoryItem[]) =>
		array.findIndex(i => i.title === item.title) === index
		&& !pinned.find(pinnedItem => pinnedItem.title === item.title)
}

export function movePinnedItemBetweenArrays<T extends HistoryItem>(arrFrom: T[], arrTo: T[], id: string, pinned: boolean) {
	const item = arrFrom.find(item => item.id === id)

	return item
		? [
			arrFrom.filter(item => item.id !== id),
			[...arrTo, { ...item, pinned }],
		]
		: [arrFrom, arrTo]
}
