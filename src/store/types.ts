import { storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { storeKey as sectionsStoreKey } from 'store/constants/sections'
import { storeKey as settingsStoreKey } from 'store/constants/settings'
import type { DialogsState } from 'types/dialogs'
import type { SectionsState } from 'types/sections'
import type { SettingsState } from 'types/settings'

export type PersistState<T> = T & {
	_persist: { version: number; rehydrated: boolean }
}

export type RootState = {
	[dialogsStoreKey]: DialogsState
	[settingsStoreKey]: PersistState<SettingsState>
	[sectionsStoreKey]: PersistState<SectionsState>
}
