import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { UIHistoryItem } from 'libs/history'
import { TicketHistoryItem } from 'libs/history/types'

export interface UIItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	id: UIHistoryItem['id']
	title: string
	url: UIHistoryItem['url']
}

export interface TicketItemProps extends UIItemProps {
	type: TicketHistoryItem['type']
}
