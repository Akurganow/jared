import cn from 'classnames'
import SVGIcon from 'components/SVGIcon'
import st from './styles.module.css'
import { TicketItemProps } from './types'
export default function ({ id, title, url, type, provider }: TicketItemProps) {
	return (
		<a
			key={id}
			title={title}
			href={url.href}
			className={cn(st.item, st[type])}
		>
			<div>
				{type}
			</div>
			{title}
			{
				provider !== 'unknown'
					? <SVGIcon name={`${provider}Logo`} className={st.icon}/>
					: null
			}
		</a>
	)
}
