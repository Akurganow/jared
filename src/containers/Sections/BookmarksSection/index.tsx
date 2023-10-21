import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { useAsyncEffect } from 'use-async-effect'
import { useCallback, useMemo } from 'react'
import { nanoid } from 'nanoid'
import omit from 'lodash/omit'
import APIConstructor from 'utils/api'
import { selectedSection } from 'store/selectors/sections'
import { updateSectionItem, updateSectionSettings, setEditingItem } from 'store/actions/sections'
import { openDialog } from 'store/actions/dialogs'
import SectionItem from 'containers/Sections/SectionItem'
import Bookmark from 'components/Bookmark'
import Button from 'components/Button'
import BookmarkDialog from 'containers/Dialogs/BookmarkDialog'
import st from './styles.module.css'
import type { MouseEvent as ReactMouseEvent } from 'react'
import type { SectionItemBookmarks } from 'types/sections'
import type { SectionProps } from 'containers/Sections/types'

const API = new APIConstructor()

export default function BookmarksSection({ withTitle, id, className, sectionClassName, ...props }: SectionProps) {
	const dispatch = useDispatch()
	const section = useSelector(selectedSection(id)) as SectionItemBookmarks
	const bookmarks = useMemo(() => section.items ?? [], [section.items])
	const dialogName = useMemo(() => 'bookmark-'+id, [id])

	const createOrUpdateBookmarks = useCallback(async (browserId: string) => {
		for (const bookmark of bookmarks) {
			const { id, url, title } = bookmark

			try {
				const [item] = await API.bookmarks.get(id)

				if (!item) {
					const newItem = await API.bookmarks.create({ parentId: browserId, url, title })
					dispatch(updateSectionItem({
						...section,
						items: [...(section.items ?? []), newItem],
					}))
				} else if (item.url !== url || item.title !== title) {
					const updatedItem = await API.bookmarks.update(id, { url, title })
					dispatch(updateSectionItem({
						...section,
						items: [...(section.items ?? []), updatedItem],
					}))
				}
			} catch (error) {
				const [item] = await API.bookmarks.search({ url })

				if (!item) {
					const newItem = await API.bookmarks.create({ parentId: browserId, url, title })
					dispatch(updateSectionItem({
						...section,
						items: [...(section.items ?? []), newItem],
					}))
				} else {
					const updatedItem = await API.bookmarks.move(item.id, { parentId: browserId })
					dispatch(updateSectionItem({
						...section,
						items: [...(section.items ?? []), updatedItem],
					}))
				}
			}
		}
	}, [bookmarks, dispatch, section])
	const createOrUpdateDirectory = useCallback(async (browserKey: string, browserId?: string) => {
		if (!browserId) {
			const newFolder = await API.bookmarks.create({ title: browserKey })
			dispatch(updateSectionSettings({
				id,
				settings: {
					browserId: {
						...section.settings.browserId,
						value: newFolder.id,
					}
				}
			}))

			return newFolder.id
		} else {
			const [dir] = await API.bookmarks.get(browserId)

			if (dir.title !== browserKey) {
				await API.bookmarks.update(browserId, { title: browserKey })
			}

			return browserId
		}
	}, [dispatch, id, section.settings.browserId])

	useAsyncEffect(async () => {
		const {
			settings: {
				browserId,
				browserKey,
				saveToBrowser,
			}
		} = section

		if (!saveToBrowser.value) return

		const directoryId = await createOrUpdateDirectory(browserKey.value, browserId.value)
		await createOrUpdateBookmarks(directoryId)

		const [tree] = await API.bookmarks.getSubTree(directoryId)

		if (tree.children && tree.children.length > 0) {
			dispatch(updateSectionItem({
				...section,
				items: tree.children,
			}))
		}
	}, [])

	if (!section) return null

	const handleAddBookmark = async (bookmark: Omit<chrome.bookmarks.BookmarkTreeNode, 'id' | 'parentId'>) => {
		let newBookmark: chrome.bookmarks.BookmarkTreeNode

		if (section.settings.saveToBrowser.value) {
			newBookmark = await API.bookmarks.create({
				...bookmark,
				parentId: section.settings.browserId.value,
			})
		} else {
			newBookmark = {
				...bookmark,
				id: nanoid(),
				parentId: section.settings.browserId.value,
			}
		}

		dispatch(updateSectionItem({
			...section,
			items: [
				...(section.items ?? []),
				newBookmark
			],
		}))
	}
	const handleEditBookmark = async (edited: Omit<chrome.bookmarks.BookmarkTreeNode, 'parentId'>) => {
		const bookmark = bookmarks.find(bookmark => bookmark.id === edited.id)

		if (!bookmark) return

		let updatedBookmark: chrome.bookmarks.BookmarkTreeNode

		if (section.settings.saveToBrowser.value) {
			updatedBookmark = await API.bookmarks.update(bookmark.id, omit(edited, 'id'))
		} else {
			updatedBookmark = bookmark
		}

		dispatch(updateSectionItem({
			...section,
			items: bookmarks.map(bookmark => bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark),
		}))
	}
	const handleRemoveClick = (id: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(updateSectionItem({
			...section,
			items: bookmarks.filter(bookmark => bookmark.id !== id),
		}))
	}
	const handleEditClick = (id: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		const bookmark = bookmarks.find(bookmark => bookmark.id === id)

		if (!bookmark) return

		dispatch(setEditingItem(bookmark))
		dispatch(openDialog(dialogName))
	}
	const handleAddClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		dispatch(setEditingItem(null))
		dispatch(openDialog(dialogName))
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
		<BookmarkDialog
			name={id}
			item={section.editingItem}
			onAddBookmark={handleAddBookmark}
			onEditBookmark={handleEditBookmark}
		/>

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
