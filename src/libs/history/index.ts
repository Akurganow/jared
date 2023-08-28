function sortBy(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem, key: 'lastVisitTime' | 'visitCount') {
	return (b[key] || 0) - (a[key] || 0)
}
export function sortByVisitCount(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'visitCount')
}

export function sortByLastVisitTime(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
	return sortBy(a, b, 'lastVisitTime')
}
