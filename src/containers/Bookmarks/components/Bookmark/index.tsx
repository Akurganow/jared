import { MouseEvent as ReactMouseEvent } from 'react'
import cn from 'classnames'
import Favicon from 'components/Favicon'
import { Bookmark } from 'src/types/bookmarks'
import st from './styles.module.css'

interface BookmarkProps extends Bookmark {
	onEditClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
	onRemoveClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
}

export default function ({ id, title, url, onRemoveClick, onEditClick }: BookmarkProps) {
	return <a
		key={id}
		className={cn(st.bookmark)}
		href={url}
	>
		<Favicon href={url} size={16} className={cn(st.favicon)} />
		{title}
		<div className={cn(st.actions)}>
			<button
				onClick={onRemoveClick}
				className={cn(st.action)}
				title="Remove bookmark"
			>
				×
			</button>
			<button
				onClick={onEditClick}
				className={cn(st.action)}
				title="Edit bookmark">
				✎
			</button>
		</div>
	</a>
}
