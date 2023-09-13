import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { VCSHistoryItem } from 'utils/history/types'

export type VSCItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & VCSHistoryItem
