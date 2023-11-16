import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import SVGIcon, { SVGIconProps } from 'components/SVGIcon'
import Tooltip, { TooltipProps } from 'components/Tooltip'
import { openDialog } from 'store/actions/dialogs'
import st from './styles.module.css'

interface SidebarItemProps extends Omit<TooltipProps, 'body' | 'visible'> {
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

	return (
		<Tooltip ref={buttonRef} body={tooltip} className={className} {...props}>
			<button
				ref={buttonRef}
				className={st.button}
				onClick={handleClick}
			>
				<SVGIcon name={icon} className={st.icon} />
			</button>
		</Tooltip>
	)
}
