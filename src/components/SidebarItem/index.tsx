import cn from 'classnames'
import SVGIcon, { type SVGIconProps } from 'components/SVGIcon'
import Tooltip, { type TooltipProps } from 'components/Tooltip'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { openDialog } from 'store/actions/dialogs'
import st from './styles.module.css'

export interface SidebarItemProps extends Omit<TooltipProps, 'body' | 'visible'> {
	name: string
	icon: SVGIconProps['name']
	tooltip: TooltipProps['body']
}

export default function SidebarItem({ name, tooltip, icon, className, ...props }: SidebarItemProps) {
	const dispatch = useDispatch()
	const buttonRef = useRef<HTMLButtonElement>(null)

	const handleClick = () => {
		dispatch(openDialog(name))
	}

	return tooltip ? (
		<Tooltip ref={buttonRef} body={tooltip} className={className} {...props}>
			<button type="button" ref={buttonRef} className={st.button} onClick={handleClick}>
				<SVGIcon name={icon} className={st.icon} />
			</button>
		</Tooltip>
	) : (
		<button type="button" ref={buttonRef} className={cn(st.button, className)} onClick={handleClick}>
			<SVGIcon name={icon} className={st.icon} />
		</button>
	)
}
