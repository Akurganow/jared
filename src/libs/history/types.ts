type TicketType = 'unknown' | 'issue' | 'filter' | 'project' | 'profile' | 'board'
type GitType = 'unknown' | 'settings' | 'repo' | 'tree' | 'blob' | 'filter' | 'topics' | 'mergeRequest' | 'pullRequest'
type VCSType = 'unknown' | 'gitlab' | 'github'

interface HistoryItem extends Omit<chrome.history.HistoryItem, 'url'> {
	url: URL
	name: string
	title: string
}
export interface GitHistoryItem extends HistoryItem {
	type: GitType
	vcs: VCSType
}
export interface TicketHistoryItem extends HistoryItem {
	type: TicketType
}

type ProcessConfigItem<T, R> = [
	(item: T) => boolean,
	(item: T) => R,
	{
		type: TicketType | GitType
		name: string
	}
]

export type ProcessConfig<T, R> = ProcessConfigItem<T, R>[]
