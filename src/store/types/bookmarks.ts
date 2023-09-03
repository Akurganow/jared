export type Bookmark = {
	id: string
	title: string
	url: string
}
export type BookmarksState = {
	bookmarks: Bookmark[]
	editingBookmark: Bookmark | null
}
