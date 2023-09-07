import { DetailedHTMLProps, HTMLAttributes, useMemo } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { selectedVCS } from 'store/selectors/history'
import st from './styles.module.css'
import Item from './components/Item'

interface VSCProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export default function ({ className, ...props }: VSCProps) {
	const vcsHistory = useSelector(selectedVCS)
	const pinned = useMemo(() =>
		vcsHistory.filter((item) => item.pinned),
	[vcsHistory]
	)
	const unpinned = useMemo(() =>
		vcsHistory.filter((item) => !item.pinned),
	[vcsHistory]
	)

	return (
		<div
			className={cn(st.repo, className)}
			{...props}
		>
			<div className={st.pinned}>
				{pinned.map((item) =>
					<Item
						key={`pinned${item.id}`}
						{...item}
					/>
				)}
			</div>
			<div className={st.unpinned}>
				{unpinned.map((item) =>
					<Item
						key={item.id}
						{...item}
					/>
				)}
			</div>
		</div>
	)
}
