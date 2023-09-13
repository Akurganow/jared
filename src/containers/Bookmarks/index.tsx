import { MouseEvent as ReactMouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedBookmarks } from 'store/selectors/bookmarks'
import { openDialog } from 'store/actions/dialogs'
import { clearEditingBookmark, removeBookmark, setEditingBookmark } from 'store/actions/bookmarks'
import SVGIcon from 'components/SVGIcon'
import Bookmark from 'containers/Bookmarks/components/Bookmark'
import st from './styles.module.css'

export default function () {
	const dispatch = useDispatch()
	const bookmarks = useSelector(selectedBookmarks)

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

	return (
		<div className={st.container}>
			<div className={st.bookmarks}>
				{bookmarks.map(bookmark => {
					return <Bookmark
						key={bookmark.id}
						onEditClick={handleEditClick(bookmark.id)}
						onRemoveClick={handleRemoveClick(bookmark.id)}
						{...bookmark}
					/>
				})}
			</div>
			<div className={st.actions}>
				<button
					title="Add bookmark"
					className={st.action}
					onClick={handleAddClick}
				>
					<SVGIcon name="plus" className={st.icon} />
				</button>
			</div>
		</div>
	)
}