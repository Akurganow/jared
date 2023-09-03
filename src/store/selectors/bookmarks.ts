import { createSelector } from 'reselect'
import { RootState } from 'store/types'
import { storeKey } from 'store/constants/bookmarks'

const rawBookmarksState = (state: RootState) => state[storeKey]

export const selectedBookmarks = createSelector(
	rawBookmarksState,
	bookmarks => bookmarks.bookmarks
)

export const selectedEditingBookmark = createSelector(
	rawBookmarksState,
	bookmarks => bookmarks.editingBookmark
)
