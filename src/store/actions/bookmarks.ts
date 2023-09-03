import { actionCreatorFactory } from 'typescript-fsa'
import { storeKey } from 'store/constants/dialogs'
import { Bookmark } from 'store/types/bookmarks'

const createAction = actionCreatorFactory(storeKey)

export const addBookmark = createAction<Bookmark>('addBookmark')
export const removeBookmark = createAction<Bookmark['id']>('removeBookmark')
export const setEditingBookmark = createAction<Bookmark['id']>('setEditingBookmark')
export const clearEditingBookmark = createAction('clearEditingBookmark')
export const editBookmark = createAction<Bookmark>('editBookmark')
