import { useDispatch, useSelector } from 'react-redux'
import { FormEvent, useCallback } from 'react'
import { nanoid } from 'nanoid'
import Dialog, { DialogHeader, DialogBody, DialogFooter } from 'components/Dialog'
import Button from 'components/Button'
import { closeDialog } from 'store/actions/dialogs'
import { addBookmark, clearEditingBookmark, editBookmark } from 'store/actions/bookmarks'
import { selectedEditingBookmark } from 'store/selectors/bookmarks'
import st from './styles.module.css'

function getValues(form: HTMLFormElement, keys: string[]) {
	const values = keys.map(key => {
		const element = form.elements.namedItem(key) as HTMLInputElement | undefined

		if (element) {
			return element.value
		}

		return ''
	})

	return values
}
export default function () {
	const dispatch = useDispatch()
	const editingBookmark = useSelector(selectedEditingBookmark)

	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const id = nanoid()
		const [ title, url] = getValues(form, ['title', 'url'])

		if (editingBookmark) {
			dispatch(editBookmark({ id: editingBookmark.id, title, url }))
		} else {
			dispatch(addBookmark({ id, title, url }))
		}
		dispatch(closeDialog('bookmark'))
		dispatch(clearEditingBookmark())
	}, [editingBookmark, dispatch])

	const handleClose = useCallback(() => {
		dispatch(closeDialog('bookmark'))
	}, [dispatch])

	return <Dialog name="bookmark">
		<DialogHeader>Bookmark</DialogHeader>
		<DialogBody>
			<form id="bookmark-form" className={st.container} onSubmit={handleSubmit}>
				<div className={st.name}>Title:</div>
				<div className={st.value}>
					<input
						type="text"
						name="title"
						defaultValue={editingBookmark?.title}
					/>
				</div>

				<div className={st.name}>URL:</div>
				<div className={st.value}>
					<input
						type="text"
						name="url"
						defaultValue={editingBookmark?.url}
					/>
				</div>
			</form>
		</DialogBody>
		<DialogFooter>
			<Button
				type="submit"
				form="bookmark-form"
			>
				{editingBookmark ? 'Save' : 'Add'}
			</Button>
			<Button onClick={handleClose}>
				Close
			</Button>
		</DialogFooter>
	</Dialog>
}
