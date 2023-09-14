import memoize from 'lodash/memoize'
import { createSelector } from 'reselect'
import set from 'lodash/set'
import { SettingsState } from 'store/types/settings'
// eslint-disable-next-line import/no-cycle
import { RootState } from 'store/types'

import { storeKey } from 'store/constants/settings'

const rawSelectedSettings = (state: RootState) => state[storeKey]
export const selectedSettingsKeys = createSelector(
	rawSelectedSettings,
	(settings) =>
		Object.keys(settings).filter(key =>
			!key.startsWith('_')
		) as (keyof SettingsState)[]
)
export const selectedSettings = createSelector(
	rawSelectedSettings,
	selectedSettingsKeys,
	(settings, keys) => {
		const filteredSettings = {} as Partial<SettingsState>

		keys.forEach(key => {
			if (keys.includes(key)) {
				const setting = settings[key]
				set(filteredSettings, key, setting)
			}
		})

		return filteredSettings as SettingsState
	}
)
export const createSettingSelector = createSelector(
	[
		selectedSettings,
		(_state, key) => key,
	],
	(settings, key) =>
		settings[key as keyof typeof settings]
)
export const createSettingValueSelector = createSelector(
	[
		selectedSettings,
		(_state, key) => key,
	],
	(settings, key) =>
		settings[key as keyof typeof settings]?.value
)
export const createSettingTypeSelector = createSelector(
	[
		selectedSettings,
		(_state, key) => key,
	],
	(settings, key) =>
		settings[key as keyof typeof settings]?.type
)
export const selectedSetting = memoize((key: string) =>
	(state: SettingsState) => createSettingSelector(state, key)
)
export const selectedSettingValue = memoize((key: string) =>
	(state: SettingsState) => createSettingValueSelector(state, key)
)
export const selectedSettingType = memoize((key: string) =>
	(state: SettingsState) => createSettingTypeSelector(state, key)
)
