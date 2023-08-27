import storage from 'redux-persist/lib/storage'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'
import { getThemeNames } from 'libs/themes'

export type SettingsTypes = 'number' | 'string' | 'boolean' | 'option'

export type SettingItem<T> = {
	value: T
	options?: T[]
	type: SettingsTypes
}
export interface SettingsState {
	maxResults: SettingItem<number>
	theme: SettingItem<string>
}

export const storeKey = 'settings'

export const initialState: SettingsState = {
	maxResults: {
		value: 100,
		type: 'number'
	},
	theme: {
		value: 'default',
		options: getThemeNames(),
		type: 'option'
	}
}

export const persistConfig = {
	key: `jared/${storeKey}`,
	storage,
}

// Actions
const createAction = actionCreatorFactory(storeKey)

export const setSetting = createAction<{key: keyof SettingsState, setting: SettingsState[keyof SettingsState]}>('setSettings')

// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(setSetting, (state, { key, setting }) => ({
		...state,
		[key]: setting,
	}))

interface RootState {
	[storeKey]: ReturnType<typeof reducer>
}

// Selectors
const rawSelectedSettings = (state: RootState) => state[storeKey]

export const selectedSettingsKeys = createSelector(
	rawSelectedSettings,
	(settings) =>
		Object.keys(settings).filter(key => !key.startsWith('_'))
)

export const selectedSettings = createSelector(
	rawSelectedSettings,
	selectedSettingsKeys,
	(settings, keys) => {
		const selected: SettingsState = settings

		for (const key of Object.keys(keys)) {
			if (!keys.includes(key)) {
				delete selected[key as keyof typeof selected]
			}
		}

		return selected
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
