import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { UIHistoryItem } from 'libs/history'
import { VCSHistoryItem } from 'libs/history/types'

export interface UIItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: UIHistoryItem['id']
	title: string
	url: UIHistoryItem['url']
}

export interface GitItemProps extends UIItemProps {
	type: VCSHistoryItem['type']
	repoName: VCSHistoryItem['name']
	gitType: VCSHistoryItem['provider']
}
