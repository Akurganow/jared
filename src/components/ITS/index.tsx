import cn from 'classnames'
import { useSelector } from 'react-redux'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { selectedITS } from 'store/selectors/history'
import Item from './components/Item'
import st from './styles.module.css'

interface ITSProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
export default function ({ className, ...props }: ITSProps) {
	const itsHistory = useSelector(selectedITS)

	return (
		<div
			className={cn(st.tickets, className)}
			{...props}
		>
			{itsHistory.map((item) => <Item
				key={`${item.pinned ? 'pinned' : ''}${item.id}`}
				{...item}
			/>)}
		</div>
	)
}
