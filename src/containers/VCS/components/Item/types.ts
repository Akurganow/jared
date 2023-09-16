import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { VCSHistoryItem } from 'types/history'

export type VSCItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & VCSHistoryItem
