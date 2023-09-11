import { SettingsState } from 'store/types/settings'
import { getThemesNames } from 'utils/themes'

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
		value: 'none',
		options: getThemesNames(),
		type: 'option',
		name: 'Theme',
	}
}
