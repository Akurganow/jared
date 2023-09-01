import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import { selectedVCS } from 'store/history'
import st from './styles.module.css'
import Item from './components/Item'

interface RepoProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export default function ({ className, ...props }: RepoProps) {
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
