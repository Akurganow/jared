import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ITSHistoryItem } from 'libs/history/types'

export interface TicketItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	id: ITSHistoryItem['id']
	url: ITSHistoryItem['url']
	type: ITSHistoryItem['type']
	provider: ITSHistoryItem['provider']
}
