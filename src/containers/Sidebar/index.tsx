import cn from 'classnames'
import SidebarItem from 'components/SidebarItem'
import Icon from 'components/SVGIcon'
import DownloadsTooltip from 'containers/DownloadsTooltip'
import { type ComponentProps, type DetailedHTMLProps, type HTMLAttributes, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchEditMode } from 'store/actions/sections'
import { selectedEditMode } from 'store/selectors/sections'
import st from './styles.module.css'

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

interface SidebarItemMap extends Omit<ComponentProps<typeof SidebarItem>, 'icon' | 'name'> {
	name: ComponentProps<typeof SidebarItem>['icon']
	hiddenOnPro?: boolean
}

const sidebarItems: SidebarItemMap[] = [
	{
		name: 'settings',
		tooltip: null,
	},
	{
		name: 'download',
		tooltip: <DownloadsTooltip />,
		hiddenOnPro: true,
	},
	{
		name: 'code',
		tooltip: null,
		hiddenOnPro: true,
	},
]

const hideHidden = true

export default function Sidebar({ className, ...props }: SidebarProps) {
	const dispatch = useDispatch()
	const currentEditMode = useSelector(selectedEditMode)

	const handleEditMode = useCallback(() => {
		dispatch(switchEditMode(!currentEditMode))
	}, [currentEditMode, dispatch])

	return (
		<aside className={cn(st.sidebar, className)} {...props}>
			<button type="button" className={st.item} onClick={handleEditMode}>
				<Icon name="edit" className={cn(st.icon, { [st.active]: !currentEditMode })} />
			</button>

			{sidebarItems.map(({ hiddenOnPro, ...item }) => {
				if (hiddenOnPro && (hideHidden || process.env.NODE_ENV === 'production')) {
					return null
				}

				return (
					<SidebarItem
						key={item.name}
						className={st.item}
						icon={item.name as ComponentProps<typeof SidebarItem>['icon']}
						{...item}
					/>
				)
			})}

			<SidebarItem className={cn(st.item, st.last)} icon="help" name="help" tooltip={null} />
		</aside>
	)
}
