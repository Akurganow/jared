import storage from 'redux-persist/lib/storage'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import merge from 'lodash/merge'
import { getThemesNames } from 'libs/themes'
import { SettingsState } from 'store/types/settings'
import { setSetting, setSettings } from 'store/actions/settings'

export const storeKey = 'settings'

export const initialState: SettingsState = {
	maxResults: {
		value: 100,
		type: 'number',
		name: 'Max results',
	},
	numDays: {
		value: 7,
		step: 1,
		type: 'number',
		name: 'Number of days',
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

