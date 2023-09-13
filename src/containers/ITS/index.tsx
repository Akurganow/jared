import cn from 'classnames'
import { useSelector } from 'react-redux'
import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import { selectedITS } from 'store/selectors/history'
import Item from './components/Item'
import st from './styles.module.css'

interface ITSProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
export default function ({ className, ...props }: ITSProps) {
	const itsHistory = useSelector(selectedITS)
	const pinned = useMemo(() =>
		itsHistory.filter((item) => item.pinned),
	[itsHistory]
	)
	const unpinned = useMemo(() =>
		itsHistory.filter((item) => !item.pinned),
	[itsHistory]
	)
	return (
		<div
			className={cn(st.tickets, className)}
			{...props}
		>
			<div className={st.pinned}>
				{pinned.map((item) =>
					<Item
						key={`pinned${item.id}`}
						{...item}
					/>
				)}
			</div>
			<div className={st.unpinned}>
				{unpinned.map((item) =>
					<Item
						key={item.id}
						{...item}
					/>
				)}
			</div>
		</div>
	)
}