import cn from 'classnames'
import { useSelector } from 'react-redux'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { selectedTickets } from 'store/history'
import Item from './components/Item'
import st from './styles.module.css'

interface TicketsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
export default function ({ className, ...props }: TicketsProps) {
	const tickets = useSelector(selectedTickets)

	return (
		<div
			className={cn(st.tickets, className)}
			{...props}
		>
			{tickets.map((item) => <Item
				key={item.id}
				id={item.id}
				type={item.type}
				url={item.url}
				title={item.title}
				provider={item.provider}
			/>)}
		</div>
	)
}
