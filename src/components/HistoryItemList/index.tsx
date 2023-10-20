import cn from 'classnames'
import HistoryItem from 'components/HistoryItem'
import st from './styles.module.css'
import type { VCSHistoryItem, ITSHistoryItem } from 'types/history'
import type { HTMLAttributes } from 'react'

interface HistoryItemListProps extends HTMLAttributes<HTMLDivElement>{
	items: (VCSHistoryItem | ITSHistoryItem)[]
	pinned: (VCSHistoryItem | ITSHistoryItem)[]
	switchPin: (id: string, pinned: boolean) => void
}
export default function HistoryItemList({ items, pinned, className, switchPin, ...props }: HistoryItemListProps) {
	return (
		<div
			className={cn(st.container, className)}
			data-testid="HistoryItemList"
			{...props}
		>
			<div className={st.pinned}>
				{pinned.map(item =>
					<HistoryItem key={`pinned${item.id}`} {...item} switchPin={switchPin} pinned={true} />
				)}
			</div>
			<div className={st.unpinned}>
				{items.map(item =>
					<HistoryItem key={item.id} {...item} switchPin={switchPin} pinned={false} />
				)}
			</div>
		</div>
	)
}
