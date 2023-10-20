import { DetailedHTMLProps, HTMLAttributes } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'components/SVGIcon'
import { openDialog } from 'store/actions/dialogs'
import { switchEditMode } from 'store/actions/sections'
import { selectedEditMode } from 'store/selectors/sections'
import st from './styles.module.css'

interface SidebarProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

export default function ({ className, ...props }: SidebarProps) {
	const dispatch = useDispatch()
	const currentEditMode = useSelector(selectedEditMode)
	const handleDialogSwitch = (name: string) => () => {
		dispatch(openDialog(name))
	}

	const handleEditMode = () => {
		dispatch(switchEditMode(!currentEditMode))
	}

	return (
		<aside
			className={cn(st.sidebar, className)}
			{...props}
		>
			<button className={st.item} onClick={handleDialogSwitch('settings')}>
				<Icon name="settings" className={st.icon}/>
			</button>

			<button className={st.item} onClick={handleEditMode}>
				<Icon name="edit" className={cn(st.icon, { [st.active]: !currentEditMode })}/>
			</button>
		</aside>
	)
}
