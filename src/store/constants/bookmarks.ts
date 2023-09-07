import { BookmarksState } from 'store/types/bookmarks'

export const storeKey = 'bookmarks'
export const initialState: BookmarksState = {
	bookmarks: [],
	editingBookmark: null,
}