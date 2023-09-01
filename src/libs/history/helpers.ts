import memoize from 'lodash/memoize'
import { ProcessConfig } from './types'

function rawGetUrl(itemUrl: string): [URL, string[]] {
	const url = new URL(itemUrl)
	const path = url.pathname.split('/').filter(Boolean)

	return [
		url,
		path,
	]
}

function rawGetSplitTitle(title: string): string[] {
	const splitTitle = title?.split(' - ')

	splitTitle?.pop()

	return splitTitle
}

export const getSplitTitle = memoize(rawGetSplitTitle)

export const getUrl = memoize(rawGetUrl)

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
