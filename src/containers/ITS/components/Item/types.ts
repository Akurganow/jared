import { DetailedHTMLProps, HTMLAttributes } from 'react'

import { ITSHistoryItem } from 'src/types/history'

export type ITSItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ITSHistoryItem
