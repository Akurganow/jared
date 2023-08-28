import storage from 'redux-persist/lib/storage'
import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { createSelector } from 'reselect'
import memoize from 'lodash/memoize'
import merge from 'lodash/merge'
import set from 'lodash/set'
import { RootState } from 'store/types'
import { getThemesNames } from 'libs/themes'

export type SettingsTypes = 'number' | 'string' | 'boolean' | 'option'
export type SettingTypeString = {
	type: 'string'
	name: string
	value: string
	pattern?: RegExp
}
export type SettingTypeNumber = {
	type: 'number'
	name: string
	value: number
	max?: number
	min?: number
}
export type SettingTypeBoolean = {
	type: 'boolean'
	name: string
	value: boolean
}
export type SettingTypeOption = {
	type: 'option'
	name: string
	value: string
	options: string[]
}

export interface SettingsState {
	maxResults: SettingTypeNumber
	userQuery: SettingTypeString
	vcsQuery: SettingTypeString
	itsQuery: SettingTypeString
	theme: SettingTypeOption
}

export const storeKey = 'settings'

export const initialState: SettingsState = {
	maxResults: {
		value: 100,
		type: 'number',
		name: 'Max results',
	},
	vcsQuery: {
		value: 'gitlab, github',
		type: 'string',
		name: 'VCS query',
	},
	itsQuery: {
		value: 'jira',
		type: 'string',
		name: 'ITS query',
	},
	userQuery: {
		value: 'rwc, rcv',
		type: 'string',
		name: 'Resents query',
	},
	theme: {
		value: 'default',
		options: getThemesNames(),
		type: 'option',
		name: 'Theme',
	}
}

export const persistConfig = {
	key: `jared/${storeKey}`,
	storage,
}

// Actions
const createAction = actionCreatorFactory(storeKey)

export const setSetting =
	createAction<{key: keyof SettingsState, value: SettingsState[keyof SettingsState]['value']}>('setSetting')

export const setSettings =
	createAction<Partial<SettingsState>>('setSettings')
// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(setSetting, (state, { key, value }) => ({
		...state,
		[key]: {
			...state[key],
			value,
		},
	}))
	.case(setSettings, (state, settings) =>
		merge({}, state, settings)
	)

// Selectors
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
