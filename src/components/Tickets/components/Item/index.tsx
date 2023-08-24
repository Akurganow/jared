import cn from 'classnames'
import { Text } from 'dracula-ui'
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
			<div className="drac-line-height-xs">
				<Text size="xs">{type}</Text>
			</div>
			<Text size="sm">{props.title}</Text>
		</a>
	)
}
