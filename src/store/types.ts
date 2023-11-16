import { storeKey as dialogsStoreKey } from 'store/constants/dialogs'
import { storeKey as settingsStoreKey } from 'store/constants/settings'
import { storeKey as sectionsStoreKey } from 'store/constants/sections'

import type { CombinedState } from 'redux'
import type { DialogsState } from 'types/dialogs'
import type { SettingsState } from 'types/settings'
import type { SectionsState } from 'types/sections'

export type PersistState<T> = T & {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = CombinedState<{
	[dialogsStoreKey]: DialogsState,
	[settingsStoreKey]: PersistState<SettingsState>
	[sectionsStoreKey]: PersistState<SectionsState>
}>
