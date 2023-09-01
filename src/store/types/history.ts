export interface HistoryItem extends chrome.history.HistoryItem {
}

export interface HistoryState {
	main: HistoryItem[];
	vcs: HistoryItem[];
	its: HistoryItem[];
	pinned: {
		main: HistoryItem[];
		vcs: HistoryItem[];
		its: HistoryItem[];
	}
}
