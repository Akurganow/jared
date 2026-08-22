import cn from 'classnames'
import Favicon from 'components/Favicon'
import type { MouseEvent as ReactMouseEvent } from 'react'
import st from './styles.module.css'

interface BookmarkProps extends chrome.bookmarks.BookmarkTreeNode {
	onEditClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
	onRemoveClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
}

// кнопки действий — сиблинги ссылки, а не её дети:
// вложенные интерактивные элементы ломают доступность (nested-interactive)
export default function Bookmark({ title, url, onRemoveClick, onEditClick }: BookmarkProps) {
	return (
		<div className={cn(st.bookmark)} data-testid="Bookmark">
			<a className={cn(st.link)} href={url}>
				{url && <Favicon href={url} size={16} className={cn(st.favicon)} />}
				{title}
			</a>
			<div className={cn(st.actions)}>
				<button type="button" onClick={onRemoveClick} className={cn(st.action)} title="Remove bookmark">
					×
				</button>
				<button type="button" onClick={onEditClick} className={cn(st.action)} title="Edit bookmark">
					✎
				</button>
			</div>
		</div>
	)
}
