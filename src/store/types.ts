import { CombinedState } from 'redux'
import { DialogsState } from 'types/dialogs'
import { HistoryState } from 'types/history'
import { SettingsState } from 'types/settings'
import { BookmarksState } from 'types/bookmarks'

interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = CombinedState<{
	dialogs: DialogsState,
	history: HistoryState & PersistPartial
	settings: SettingsState & PersistPartial
	bookmarks: BookmarksState & PersistPartial
}>
