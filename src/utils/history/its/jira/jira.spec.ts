import { faker } from '@faker-js/faker'
import { checkProcessor } from 'utils/history/history.fixtures'
import dashboard from 'utils/history/its/jira/dashboard'
import filter from 'utils/history/its/jira/filter'
import issue from 'utils/history/its/jira/issue'
import profile from 'utils/history/its/jira/profile'
import project from 'utils/history/its/jira/project'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import unknown from 'utils/history/its/jira/unknown'
import type { ITSHistoryItem } from 'types/history'
import type { TemplateConfig } from 'utils/history/history.fixtures'

const configs: TemplateConfig<ITSHistoryItem> = {
	unknown: {
		variables: {
			title: () => faker.lorem.sentence(),
		},
		create: {
			url: '/fake-path/{{lorem.word()}}',
			title: '{{title}} - {{lorem.word}} JIRA',
		},
		check: {
			name: '',
			title: '{{title}}',
			type: 'unknown',
			typeName: 'Unknown',
			provider: 'jira',
		}
	},
	rapidBoard: {
		variables: {
			title: () => faker.lorem.sentence(),
			viewId: () => faker.string.numeric(5),
		},
		create: {
			url: '/secure/RapidBoard.jspa?rapidView={{viewId}}',
			title: '{{title}} - {{lorem.word}} JIRA',
		},
		check: {
			name: 'board #{{viewId}}',
			title: '{{title}}',
			type: 'board',
			typeName: 'Board',
			provider: 'jira',
		}
	},
	project: {
		variables: {
			title: () => faker.lorem.sentence(),
			projectId: () => faker.lorem.word({ length: { min: 2, max: 5 } }).toUpperCase(),
		},
		create: {
			url: '/projects/{{projectId}}/issues',
			title: '{{title}} - {{lorem.word}} JIRA',
		},
		check: {
			name: '{{projectId}}',
			title: '{{projectId}}',
			type: 'project',
			typeName: 'Project',
			provider: 'jira',
		}
	},
	profile: {
		variables: {
			firstName: () => faker.person.firstName(),
			lastName: () => faker.person.lastName(),
		},
		create: {
			url: '/secure/ViewProfile.jspa?name={{firstName}}.{{lastName}}',
			title: 'User Profile: {{firstName}} {{lastName}} - {{lorem.word}} JIRA',
		},
		check: {
			name: '{{firstName}} {{lastName}}',
			title: '{{firstName}} {{lastName}}',
			type: 'profile',
			typeName: 'Profile',
			provider: 'jira',
		}
	},
	issue: {
		variables: {
			title: () => faker.lorem.sentence(),
			issueId: () => `${faker.lorem.word(3).toUpperCase()}-${faker.string.numeric(5)}`,
		},
		create: {
			url: '/browse/{{issueId}}',
			title: '{{title}} - {{lorem.word}} JIRA',
		},
		check: {
			name: '{{issueId}}',
			title: '{{title}}',
			type: 'issue',
			typeName: 'Issue',
			provider: 'jira',
		}
	},
	filter: {
		variables: {
			filterId: () => faker.string.numeric(5),
			filterName: () => faker.lorem.sentence(),
		},
		create: {
			url: '/issues/?filter={{filterId}}',
			title: '[{{filterName}}] Issue Navigator - {{lorem.word}} JIRA',
		},
		check: {
			name: 'filter #{{filterId}}',
			title: '{{filterName}}',
			type: 'filter',
			typeName: 'Filter',
			provider: 'jira',
		}
	},
	dashboard: {
		variables: {
			title: () => faker.lorem.sentence(),
			pageId: () => faker.string.numeric(5),
		},
		create: {
			url: '/secure/Dashboard.jspa?selectPageId={{pageId}}',
			title: '{{title}} - {{lorem.word}} JIRA',
		},
		check: {
			name: 'board',
			title: '{{title}}',
			type: 'board',
			typeName: 'Dashboard',
			provider: 'jira',
		}
	}
}

describe('utils/history/its/jira', () => {
	checkProcessor(configs, 'unknown', unknown)
	checkProcessor(configs, 'rapidBoard', rapidBoard)
	checkProcessor(configs, 'project', project)
	checkProcessor(configs, 'profile', profile)
	checkProcessor(configs, 'issue', issue)
	checkProcessor(configs, 'filter', filter)
	checkProcessor(configs, 'dashboard', dashboard)
})
