export interface Bookmark extends chrome.bookmarks.BookmarkTreeNode {}

export type BookmarksState = {
	bookmarks: Bookmark[]
	editingBookmark: Bookmark | null
}
