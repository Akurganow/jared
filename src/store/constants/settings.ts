import { getThemesNames } from 'utils/themes'
import type { SettingsState } from 'types/settings'

export const storeKey = 'settings'
export const initialState: SettingsState = {
	maxResults: {
		value: 50,
		min: 1,
		type: 'number',
		name: 'Max results',
		hint: 'Max results per query',
	},
	numDays: {
		value: 14,
		step: 1,
		min: 1,
		type: 'number',
		name: 'Number of days',
		hint: 'Number of days to search',
	},
	vcsQuery: {
		value: 'https://gitlab.com gitlab\nhttps://github.com github',
		type: 'string',
		name: 'VCS query',
		hint: 'Type: gitlab, github',
	},
	itsQuery: {
		value: 'https://jira.atlassian.com/ jira',
		type: 'string',
		name: 'ITS query',
		hint: 'Type: jira',
	},
	userQuery: {
		value: 'google, reddit.com/r/dev, https://web.dev',
		type: 'string',
		name: 'Resents query',
		hint: 'Comma separated queries',
	},
	theme: {
		value: 'System',
		options: getThemesNames(),
		type: 'option',
		name: 'Theme',
		hint: 'Select a theme',
	}
}
// TODO: add settings for queries to show/hide each type in side-columns
