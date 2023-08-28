import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { VCSHistoryItem } from 'libs/history/types'

export interface VSCItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	id: VCSHistoryItem['id']
	url: VCSHistoryItem['url']
	type: VCSHistoryItem['type']
	repoName: VCSHistoryItem['name']
	provider: VCSHistoryItem['provider']
}
