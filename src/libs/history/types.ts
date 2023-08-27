type ITSType = 'unknown' | 'issue' | 'filter' | 'project' | 'profile' | 'board'
type VCSType = 'unknown' | 'settings' | 'repo' | 'tree' | 'blob' | 'filter' | 'topics' | 'mergeRequest' | 'pullRequest'
type VCSProviderType = 'unknown' | 'gitlab' | 'github'

export interface HistoryItem extends Omit<chrome.history.HistoryItem, 'url'> {
	url: URL
	name: string
	title: string
}
export interface VCSHistoryItem extends HistoryItem {
	type: VCSType
	provider: VCSProviderType
}
export interface ITSHistoryItem extends HistoryItem {
	type: ITSType
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
