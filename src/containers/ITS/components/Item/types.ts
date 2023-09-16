import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ITSHistoryItem } from 'types/history'

export type ITSItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ITSHistoryItem
