export type ITSType = 'unknown' | 'issue' | 'filter' | 'project' | 'profile' | 'board'
export type VCSType =
	'unknown'
	| 'profile'
	| 'issue'
	| 'settings'
	| 'repo'
	| 'tree'
	| 'blob'
	| 'filter'
	| 'topics'
	| 'mergeRequest'
	| 'pullRequest'
	| 'pipeline'
	| 'job'
	| 'commit'
export type VCSProviderType = 'gitlab' | 'github'
export type ITSProviderType = 'jira' // | 'youtrack'

export type HistoryQuery = {
	type?: VCSProviderType | ITSProviderType;
	text: string;
	maxResults?: number;
	error?: Error;
}

export interface HistoryItem extends chrome.history.HistoryItem {
	name: string
	title: string
	pinned?: boolean
}

export interface VCSHistoryItem extends HistoryItem {
	type: VCSType
	provider: 'unknown' | VCSProviderType
}

export interface ITSHistoryItem extends HistoryItem {
	type: ITSType
	provider: 'unknown' | ITSProviderType
}

export type ProcessConfigItem<T, R> = [
	(item: T) => boolean,
	(item: T) => R,
	{
		type: ITSType | VCSType
		name: string
	}
]
export type ProcessConfig<T, R> = ProcessConfigItem<T, R>[]

export interface HistoryState {
	main: HistoryItem[];
	vcs: VCSHistoryItem[];
	its: ITSHistoryItem[];
	pinned: {
		main: HistoryItem[];
		vcs: VCSHistoryItem[];
		its: ITSHistoryItem[];
	}
}
