import { storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { storeKey as historyStoreKey } from 'store/constants/history'
import { storeKey as settingsStoreKey } from 'store/constants/settings'
import { storeKey as sectionsStoreKey } from 'store/constants/sections'
import type { CombinedState } from 'redux'
import type { DialogsState } from 'types/dialogs'
import type { HistoryState } from 'types/history'
import type { SettingsState } from 'types/settings'
import type { SectionsState } from 'types/sections'

interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = CombinedState<{
	[dialogsStoreKey]: DialogsState,
	[historyStoreKey]: HistoryState & PersistPartial
	[settingsStoreKey]: SettingsState & PersistPartial
	[sectionsStoreKey]: SectionsState & PersistPartial
}>
