import { CombinedState } from 'redux'
import { DialogsState } from 'types/dialogs'
import { storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { HistoryState } from 'types/history'
import { storeKey as historyStoreKey } from 'store/constants/history'
import { SettingsState } from 'types/settings'
import { storeKey as settingsStoreKey } from 'store/constants/settings'
import { BookmarksState } from 'types/bookmarks'
import { storeKey as bookmarksStoreKey } from 'store/constants/bookmarks'

interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = CombinedState<{
	[dialogsStoreKey]: DialogsState,
	[historyStoreKey]: HistoryState & PersistPartial
	[settingsStoreKey]: SettingsState & PersistPartial
	[bookmarksStoreKey]: BookmarksState & PersistPartial
}>
