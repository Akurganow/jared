import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ITSHistoryItem } from 'utils/history/types'

export type ITSItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ITSHistoryItem
