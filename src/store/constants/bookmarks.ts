import type { BookmarksState } from 'types/bookmarks'

export const storeKey = 'bookmarks'
export const initialState: BookmarksState = {
	bookmarks: [],
	editingBookmark: null,
}
