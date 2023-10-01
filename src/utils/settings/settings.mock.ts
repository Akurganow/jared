import { SettingsState } from 'types/settings'

export const allProvidersDisabledUnknown = {
	type: 'custom',
	name: 'Processing',
	value: '',
	providers: {
		gitlab: {
			disabled: ['unknown'],
		},
		github: {
			disabled: ['unknown'],
		},
		jira: {
			disabled: ['unknown'],
		},
		youtrack: {
			disabled: ['unknown'],
		}
	}
} as SettingsState['processing']

export const allProvidersDisabledUnknownResult = {
	'github': [
		{
			'disabled': false,
			'name': 'Profile',
			'type': 'profile'
		},
		{
			'disabled': false,
			'name': 'Issue',
			'type': 'issue'
		},
		{
			'disabled': false,
			'name': 'Settings',
			'type': 'settings'
		},
		{
			'disabled': false,
			'name': 'Topics',
			'type': 'topics'
		},
		{
			'disabled': false,
			'name': 'Pull request',
			'type': 'pullRequest'
		},
		{
			'disabled': false,
			'name': 'Pull requests',
			'type': 'filter'
		},
		{
			'disabled': false,
			'name': 'Issues',
			'type': 'filter'
		},
		{
			'disabled': false,
			'name': 'Search',
			'type': 'filter'
		},
		{
			'disabled': false,
			'name': 'Blob search',
			'type': 'blob'
		},
		{
			'disabled': false,
			'name': 'Tree',
			'type': 'tree'
		},
		{
			'disabled': false,
			'name': 'Blob',
			'type': 'blob'
		},
		{
			'disabled': false,
			'name': 'Repository',
			'type': 'repository'
		},
		{
			'disabled': false,
			'name': 'Unknown',
			'type': 'unknown'
		}
	],
	'gitlab': [
		{
			'disabled': false,
			'name': 'Profile',
			'type': 'profile'
		},
		{
			'disabled': false,
			'name': 'Tree',
			'type': 'tree'
		},
		{
			'disabled': false,
			'name': 'Merge Request',
			'type': 'mergeRequest'
		},
		{
			'disabled': false,
			'name': 'Merge requests',
			'type': 'pipeline'
		},
		{
			'disabled': false,
			'name': 'Jobs',
			'type': 'job'
		},
		{
			'disabled': false,
			'name': 'Pipelines',
			'type': 'pipeline'
		},
		{
			'disabled': false,
			'name': 'Commit',
			'type': 'commit'
		},
		{
			'disabled': false,
			'name': 'Repository',
			'type': 'repository'
		},
		{
			'disabled': false,
			'name': 'Unknown',
			'type': 'unknown'
		}
	],
	'jira': [
		{
			'disabled': false,
			'name': 'Issue',
			'type': 'issue'
		},
		{
			'disabled': false,
			'name': 'Issues',
			'type': 'filter'
		},
		{
			'disabled': false,
			'name': 'Project',
			'type': 'project'
		},
		{
			'disabled': false,
			'name': 'Profile',
			'type': 'profile'
		},
		{
			'disabled': false,
			'name': 'Board',
			'type': 'board'
		},
		{
			'disabled': false,
			'name': 'Dashboard',
			'type': 'board'
		},
		{
			'disabled': false,
			'name': 'Unknown',
			'type': 'unknown'
		}
	],
	'youtrack': [
		{
			'disabled': false,
			'name': 'Issue',
			'type': 'issue'
		},
		{
			'disabled': false,
			'name': 'Unknown',
			'type': 'unknown'
		}
	]
}
