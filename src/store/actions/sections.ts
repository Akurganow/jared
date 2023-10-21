import { actionCreatorFactory } from 'typescript-fsa'
import { storeKey } from 'store/constants/sections'
import { ITSHistoryItem, VCSHistoryItem } from 'types/history'
import type { SectionItem } from 'types/sections'

const createAction = actionCreatorFactory(storeKey)

export const addSection = createAction<SectionItem>('addSection')
export const splitSection = createAction<SectionItem['id']>('splitSection')
export const removeSection = createAction<SectionItem['id']>('removeSection')

export const updateSectionSettings = createAction<{
	id: SectionItem['id']
	settings: Partial<SectionItem['settings']>
}>('updateSectionSettings')

export const switchEditMode = createAction<boolean>('switchEditMode')

export const setEditingSection = createAction<SectionItem['id'] | null>('setEditingSection')

export const updateSectionItem = createAction<SectionItem>('updateSectionItem')

export const updateSectionType = createAction<{
	id: SectionItem['id']
	type: SectionItem['type']
}>('updateSectionType')

export const setSectionItems = createAction<{
	id: SectionItem['id']
	items: SectionItem['items']
}>('setSectionItems')

export const switchSectionItemPin = createAction<{
	id: SectionItem['id']
	itemId: string
	pinned: boolean
}>('switchPinItem')

export const updatePinnedItems = createAction<{
	id: SectionItem['id']
	items:  VCSHistoryItem[] | ITSHistoryItem[] | chrome.history.HistoryItem[]
}>('updatePinnedItems')

export const setEditingItem = createAction<chrome.bookmarks.BookmarkTreeNode | null>('setEditingBookmark')
