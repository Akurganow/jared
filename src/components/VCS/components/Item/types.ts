import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { VCSHistoryItem } from 'libs/history/types'

export type VSCItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & VCSHistoryItem
