import cn from 'classnames'
import Favicon from 'components/Favicon'
import type { MouseEvent as ReactMouseEvent } from 'react'
import st from './styles.module.css'

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
	onEditClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
	onRemoveClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
}

export default function Bookmark({ id, title, url, onRemoveClick, onEditClick }: BookmarkProps) {
	return (
		<a key={id} className={cn(st.bookmark)} href={url}>
			{url && <Favicon href={url} size={16} className={cn(st.favicon)} />}
			{title}
			<div className={cn(st.actions)}>
				<button type="button" onClick={onRemoveClick} className={cn(st.action)} title="Remove bookmark">
					×
				</button>
				<button type="button" onClick={onEditClick} className={cn(st.action)} title="Edit bookmark">
					✎
				</button>
			</div>
		</a>
	)
}
