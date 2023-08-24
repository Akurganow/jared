import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { UIHistoryItem } from 'libs/history'
import { GitHistoryItem } from 'libs/history/types'

export interface UIItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: UIHistoryItem['id']
	title: string
	url: UIHistoryItem['url']
}

export interface GitItemProps extends UIItemProps {
	type: GitHistoryItem['type']
	repoName: GitHistoryItem['name']
	gitType: GitHistoryItem['vcs']
}
