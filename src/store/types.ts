import { CombinedState } from 'redux'
import { DialogsState } from 'src/types/dialogs'
import { HistoryState } from 'src/types/history'
import { SettingsState } from 'src/types/settings'
import { BookmarksState } from 'src/types/bookmarks'

interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = CombinedState<{
	dialogs: DialogsState,
	history: HistoryState & PersistPartial
	settings: SettingsState & PersistPartial
	bookmarks: BookmarksState & PersistPartial
}>
