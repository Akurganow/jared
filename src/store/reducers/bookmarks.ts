import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { initialState } from 'store/constants/bookmarks'
import {
	addBookmark,
	clearEditingBookmark,
	editBookmark,
	removeBookmark,
	setEditingBookmark
} from 'store/actions/bookmarks'

const reducer = reducerWithInitialState(initialState)
	.case(addBookmark, (state, bookmark) => ({
		...state,
		bookmarks: [...state.bookmarks, bookmark],
	}))
	.case(removeBookmark, (state, id) => ({
		...state,
		bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id)
	}))
	.case(setEditingBookmark, (state, id) => {
		const bookmark = state.bookmarks.find(bookmark => bookmark.id === id)

		if (!bookmark) return state

		return {
			...state,
			editingBookmark: bookmark,
		}
	})
	.case(clearEditingBookmark, state => ({
		...state,
		editingBookmark: null,
	}))
	.case(editBookmark, (state, bookmark) => {
		const index = state.bookmarks.findIndex(({ id }) => id === bookmark.id)
		const bookmarks = [
			...state.bookmarks.slice(0, index),
			bookmark,
			...state.bookmarks.slice(index + 1),
		]

		return {
			...state,
			bookmarks,
		} })

export default reducer
