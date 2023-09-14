import { ProcessorType } from 'utils/history'

export interface HistoryItem extends chrome.history.HistoryItem {
}

export type HistoryQuery = {
	type?: ProcessorType;
	text: string;
	maxResults?: number;
	error?: Error;
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
