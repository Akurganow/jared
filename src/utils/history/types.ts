export type ITSType = 'unknown' | 'issue' | 'filter' | 'project' | 'profile' | 'board'
export type VCSType = 'unknown' | 'settings' | 'repo' | 'tree' | 'blob' | 'filter' | 'topics' | 'mergeRequest' | 'pullRequest' | 'pipeline' | 'job' | 'commit'
export type VCSProviderType = 'gitlab' | 'github'
export type ITSProviderType = 'jira' // | 'youtrack'

export interface HistoryItem extends Omit<chrome.history.HistoryItem, 'url'> {
	url: URL // TODO: change to string
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
