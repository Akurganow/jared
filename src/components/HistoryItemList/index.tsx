import { useMemo } from 'react'
import cn from 'classnames'
import HistoryItem from 'components/HistoryItem'
import st from './styles.module.css'
import type { VCSHistoryItem, ITSHistoryItem } from 'types/history'
import type { HTMLAttributes } from 'react'

interface HistoryItemListProps extends HTMLAttributes<HTMLDivElement>{
	items: (VCSHistoryItem | ITSHistoryItem)[]
}
export default function HistoryItemList({ items, className, ...props }: HistoryItemListProps) {
	const pinned = useMemo(
		() => items.filter((item) => item.pinned),
		[items]
	)
	const unpinned = useMemo(
		() => items.filter((item) => !item.pinned),
		[items]
	)

	return (
		<div
			className={cn(st.container, className)}
			data-testid="HistoryItemList"
			{...props}
		>
			<div className={st.pinned}>
				{pinned.map(item =>
					<HistoryItem key={`pinned${item.id}`} {...item} />
				)}
			</div>
			<div className={st.unpinned}>
				{unpinned.map(item =>
					<HistoryItem key={item.id} {...item} />
				)}
			</div>
		</div>
	)
}
