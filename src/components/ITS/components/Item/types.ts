import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ITSHistoryItem } from 'libs/history/types'

export type ITSItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ITSHistoryItem
