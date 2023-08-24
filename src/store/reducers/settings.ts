import storage from 'redux-persist/lib/storage'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'

export type SettingsTypes = 'number' | 'string' | 'boolean'

export type SettingItem<T> = {
	value: T
	type: SettingsTypes
}
export interface SettingsState {
    maxResults: SettingItem<number>
}

export const storeKey = 'settings'

export const initialState: SettingsState = {
	maxResults: {
		value: 100,
		type: 'number'
	},
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
		const selected: Partial<SettingsState> = {}

		for (const key of keys) {
			selected[key as keyof typeof selected] = settings[key as keyof typeof settings]
		}

		return selected
	}
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

export const selectedSettingValue = memoize((key: string) =>
	(state: SettingsState) => createSettingValueSelector(state, key)
)
export const selectedSettingType = memoize((key: string) =>
	(state: SettingsState) => createSettingTypeSelector(state, key)
)
