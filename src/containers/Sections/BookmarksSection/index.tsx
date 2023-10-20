import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { selectedSection } from 'store/selectors/sections'
import { selectedBookmarks } from 'store/selectors/bookmarks'
import { clearEditingBookmark, removeBookmark, setEditingBookmark } from 'store/actions/bookmarks'
import { openDialog } from 'store/actions/dialogs'
import SectionItem from 'containers/Sections/SectionItem'
import Bookmark from 'components/Bookmark'
import Button from 'components/Button'
import st from './styles.module.css'
import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SectionItemBookmarks } from 'types/sections'
import type { SectionProps } from 'containers/Sections/types'

export default function BookmarksSection({ withTitle, id, className, sectionClassName, ...props }: SectionProps) {
	const dispatch = useDispatch()
	const section = useSelector(selectedSection(id)) as SectionItemBookmarks
	const bookmarks = useSelector(selectedBookmarks)

	if (!section) return null

	const handleAddClick = () => {
		dispatch(clearEditingBookmark())
		dispatch(openDialog('bookmark'))
	}

	const handleEditClick = (id: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(setEditingBookmark(id))
		dispatch(openDialog('bookmark'))
	}
	const handleRemoveClick = (id: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(removeBookmark(id))
	}

	return <SectionItem
		{...props}
		id={id}
		type={section.type}
		title={section.type}
		withTitle={withTitle}
		className={cn(className, st.container)}
		sectionClassName={cn(sectionClassName)}
	>
		<div className={st.bookmarks}>
			{bookmarks.map(bookmark =>
				<Bookmark
					key={bookmark.id}
					onEditClick={handleEditClick(bookmark.id)}
					onRemoveClick={handleRemoveClick(bookmark.id)}
					{...bookmark}
				/>
			)}
			<Button
				title="Add bookmark"
				className={st.action}
				onClick={handleAddClick}
			>
				+
			</Button>
		</div>
	</SectionItem>
}
