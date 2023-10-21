import { useDispatch } from 'react-redux'
import { FormEvent, useCallback, useMemo } from 'react'
import Dialog, { DialogHeader, DialogBody, DialogFooter } from 'components/Dialog'
import Button from 'components/Button'
import { closeDialog } from 'store/actions/dialogs'
import { setEditingItem } from 'store/actions/sections'
import st from './styles.module.css'

function getValues(form: HTMLFormElement, keys: string[]) {
	return keys.map(key => {
		const element = form.elements.namedItem(key) as HTMLInputElement | undefined

		if (element) {
			return element.value
		}

		return ''
	})
}

interface BookmarkDialogProps {
	name: string
	item?: chrome.bookmarks.BookmarkTreeNode | null
	onAddBookmark: (bookmark: Omit<chrome.bookmarks.BookmarkTreeNode, 'id' | 'parentId'>) => void
	onEditBookmark: (bookmark: Omit<chrome.bookmarks.BookmarkTreeNode, 'parentId'>) => void
}

export default function ({ name, item, onAddBookmark, onEditBookmark }: BookmarkDialogProps) {
	const dispatch = useDispatch()
	const dialogName = useMemo(() => 'bookmark-'+name, [name])
	const formId = useMemo(() => 'bookmark-form-'+name, [name])

	const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const form = event.target as HTMLFormElement
		const [ title, url] = getValues(form, ['title', 'url'])

		if (item) {
			onEditBookmark({ id: item.id, title, url })
		} else {
			onAddBookmark({ title, url })
		}
		dispatch(closeDialog(dialogName))
		dispatch(setEditingItem(null))
	}, [item, dispatch, dialogName, onEditBookmark, onAddBookmark])

	const handleClose = useCallback(() => {
		dispatch(closeDialog(dialogName))
	}, [dialogName, dispatch])

	return <Dialog name={dialogName}>
		<DialogHeader>Bookmark</DialogHeader>
		<DialogBody>
			<form id={formId} className={st.container} onSubmit={handleSubmit}>
				<div className={st.name}>Title:</div>
				<div className={st.value}>
					<input
						type="text"
						name="title"
						required
						defaultValue={item?.title || ''}
					/>
				</div>

				<div className={st.name}>URL:</div>
				<div className={st.value}>
					<input
						type="url"
						name="url"
						required
						defaultValue={item?.url || ''}
					/>
				</div>
			</form>
		</DialogBody>
		<DialogFooter>
			<Button
				type="submit"
				form={formId}
			>
				{item ? 'Save' : 'Add'}
			</Button>
			<Button onClick={handleClose}>
				Close
			</Button>
		</DialogFooter>
	</Dialog>
}
