import { DetailedHTMLProps, HTMLAttributes } from 'react'
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

	return (
		<div
			className={cn(st.repo, className)}
			{...props}
		>
			{vcsHistory.map((item) => (
				<Item
					key={`${item.pinned ? 'pinned' : ''}${item.id}`}
					{...item}
				/>
			))}
		</div>
	)
}
