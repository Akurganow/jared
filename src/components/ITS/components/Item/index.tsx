import cn from 'classnames'
import st from './styles.module.css'
import { TicketItemProps } from './types'
export default function (props: TicketItemProps) {
	const type = props.type ? props.type : 'unknown'

	return (
		<a
			key={props.id}
			title={props.title}
			href={props.url.href}
			className={cn(st.item, st[type])}
		>
			<div>
				{type}
			</div>
			{props.title}
		</a>
	)
}
