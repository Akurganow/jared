import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import Icon from 'components/SVGIcon'
import { openDialog } from 'store/dialogs'
import st from './styles.module.css'

interface SidebarProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

export default function ({ className, ...props }: SidebarProps) {
	const dispatch = useDispatch()
	const handleDialogSwitch = (name: string) => () => {
		dispatch(openDialog(name))
	}

	return (
		<aside
			className={cn(st.sidebar, 'drac-text', className)}
			{...props}
		>
			<button className={st.item} onClick={handleDialogSwitch('settings')}>
				<Icon name="settings" className={st.icon}/>
			</button>
		</aside>
	)
}
