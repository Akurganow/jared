import { processTicket } from 'libs/history/tickets'
import { processGit } from 'libs/history/repo'

// TODO: move it to the store/settings
const MAX_RESULTS = 100

type HistoryItemSortFunction = (a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) => number

export interface UIHistoryItem extends Omit<chrome.history.HistoryItem, 'url'> {
	url: URL;
	path: string[];
	key: string;
	trimmedTitle?: string[];
	// TODO: find a way to type it more strictly
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	additional: { [key: string]: any };
}

function sortBy(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem, key: 'visitCount' | 'lastVisitTime') {
	return (b[key] || 0) - (a[key] || 0)
}
function sortByVisitCount(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'visitCount')
}

function sortByLastVisitTime(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'lastVisitTime')
}

export async function getHistoryItems(text: string, sortFunction: HistoryItemSortFunction = sortByVisitCount) {
	const items: chrome.history.HistoryItem[] = []
	const keys = text.split(',').map((key) => key.trim())
	const currentTime = new Date().getTime()
	const oneWeekAgo = currentTime - 1000 * 60 * 60 * 24 * 7

	for (const key of keys) {
		const query: chrome.history.HistoryQuery = {
			text: key,
			startTime: oneWeekAgo,
			maxResults: MAX_RESULTS,
		}
		const results = await chrome.history.search(query)
		items.push(...results)
	}

	return items
		.filter((value, index, array) =>
			array.indexOf(value) === index
		)
		.sort(sortFunction)
}

export async function getGit() {
	return (await getHistoryItems('gitlab, github', sortByLastVisitTime))
		.map(processGit)
}

export async function getTickets() {
	return (await getHistoryItems('jira'))
		.map(processTicket)
}

