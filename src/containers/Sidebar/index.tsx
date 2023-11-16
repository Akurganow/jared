import { ComponentProps, DetailedHTMLProps, HTMLAttributes, useCallback } from 'react'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'components/SVGIcon'
import { switchEditMode } from 'store/actions/sections'
import { selectedEditMode } from 'store/selectors/sections'
import SidebarItem from 'components/SidebarItem'
import DownloadsTooltip from 'containers/DownloadsTooltip'
import st from './styles.module.css'

interface SidebarProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
}

interface SidebarItemMap extends Omit<ComponentProps<typeof SidebarItem>, 'icon' | 'name'> {
	name: ComponentProps<typeof SidebarItem>['icon']
}

const sidebarItems: SidebarItemMap[] = [
	{
		name: 'settings',
		tooltip: null
	},
	{
		name: 'download',
		tooltip: <DownloadsTooltip />
	},
	{
		name: 'code',
		tooltip: null
	}
]

export default function ({ className, ...props }: SidebarProps) {
	const dispatch = useDispatch()
	const currentEditMode = useSelector(selectedEditMode)

	const handleEditMode = useCallback(() => {
		dispatch(switchEditMode(!currentEditMode))
	}, [currentEditMode, dispatch])

	return (
		<aside
			className={cn(st.sidebar, className)}
			{...props}
		>
			<button className={st.item} onClick={handleEditMode}>
				<Icon name="edit" className={cn(st.icon, { [st.active]: !currentEditMode })}/>
			</button>

			{sidebarItems.map((item) => (
				<SidebarItem
					key={item.name}
					className={st.item}
					icon={item.name as ComponentProps<typeof SidebarItem>['icon']}
					{...item}
				/>
			))}
		</aside>
	)
}
