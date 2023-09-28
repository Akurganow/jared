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
		/*
		https://gitlab.com gitlab
		https://github.com github
		https://git.ringcentral.com gitlab 100
		 */
		value: 'https://gitlab.com gitlab\nhttps://github.com github',
		type: 'string',
		name: 'VCS query',
		hint: 'Type: gitlab, github',
	},
	itsQuery: {
		/*
		https://jira.ringcentral.com/ jira 100
		https://youtrack.jetbrains.com/ youtrack
		 */
		value: 'https://jira.atlassian.com/ jira\nhttps://youtrack.jetbrains.com/ youtrack',
		type: 'string',
		name: 'ITS query',
		hint: 'Type: jira',
	},
	userQuery: {
		/*
		rwc, rcv, ringcentral
		 */
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
	},
	processing: {
		type: 'custom',
		name: 'Processing',
		value: '',
		providers: {
			gitlab: {
				disabled: [],
			},
			github: {
				disabled: [],
			},
			jira: {
				disabled: [],
			},
			youtrack: {
				disabled: [],
			}
		},
	},
}

