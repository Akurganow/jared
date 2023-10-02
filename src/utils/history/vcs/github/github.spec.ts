import { faker } from '@faker-js/faker'
import { createRepositoryTemplate, checkProcessor } from 'utils/history/history.fixtures'
import unknown from 'utils/history/vcs/github/unknown'
import tree from 'utils/history/vcs/github/tree'
import topics from 'utils/history/vcs/github/topics'
import settings from 'utils/history/vcs/github/settings'
import repository from 'utils/history/vcs/github/repository'
import pullRequest from 'utils/history/vcs/github/pullRequest'
import profile from 'utils/history/vcs/github/profile'
import issue from 'utils/history/vcs/github/issue'
import filterSearch from 'utils/history/vcs/github/filter-search'
import filterPullRequests from 'utils/history/vcs/github/filter-pullRequests'
import filterIssues from 'utils/history/vcs/github/filter-issues'
import blobSearch from 'utils/history/vcs/github/blob-search'
import blob from 'utils/history/vcs/github/blob'
import type { VCSHistoryItem } from 'types/history'
import type { TemplateConfig } from 'utils/history/history.fixtures'

const configs: TemplateConfig<VCSHistoryItem> = {
	unknown: {
		variables: {
			title: () => faker.lorem.sentence(),
			path: () => `${faker.lorem.word()}/${faker.lorem.word()}`,
		},
		create: {
			url: '/fake-path/{{path}}',
			title: '{{title}}',
		},
		check: {
			name: '',
			title: '{{title}}',
			type: 'unknown',
			typeName: 'Unknown',
			provider: 'github',
		}
	},
	tree: {
		variables: {
			branch: () => `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`,
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/tree/{{branch}}',
			title: '{{repositoryName}} at {{branch}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{branch}}',
			type: 'tree',
			typeName: 'Tree',
			provider: 'github',
		}
	},
	topics: {
		variables: {
			topic: () => faker.git.branch(),
		},
		create: {
			url: '/topics/{{topic}}',
			title: '{{topic}} · GitHub Topics',
		},
		check: {
			name: '',
			title: '{{topic}}',
			type: 'topics',
			typeName: 'Topics',
			provider: 'github',
		}
	},
	settings: {
		variables: {
			path: () => faker.lorem.word({ length: { min: 2, max: 5 } }),
		},
		create: {
			url: '/settings/{{path}}',
			title: '{{path}} settings',
		},
		check: {
			name: 'settings/{{path}}',
			title: '{{path}} settings',
			type: 'settings',
			typeName: 'Settings',
			provider: 'github',
		}
	},
	repository: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}',
			title: '{{repositoryName}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{repositoryName}}',
			type: 'repository',
			typeName: 'Repository',
			provider: 'github',
		}
	},
	pullRequest: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			pullRequestId: () => faker.string.numeric(5),
			pullRequestName: () => faker.lorem.sentence(),
			botName: () => faker.person.firstName(),
		},
		create: {
			url: '/{{repositoryName}}/pull/{{pullRequestId}}',
			title: '{{pullRequestName}} by {{botName}}[bot] · Pull Request #{{pullRequestId}} · {{repositoryName}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{pullRequestName}} by {{botName}}[bot]',
			type: 'pullRequest',
			typeName: 'Pull request',
			provider: 'github',
		}
	},
	profile: {
		variables: {
			userName: () => faker.internet.userName(),
			fullName: () => faker.person.fullName(),
		},
		create: {
			url: '/{{userName}}',
			title: '{{userName}} ({{fullName}})',
		},
		check: {
			name: 'profile',
			title: '{{userName}} ({{fullName}})',
			type: 'profile',
			typeName: 'Profile',
			provider: 'github',
		}
	},
	issue: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			issueId: () => faker.string.numeric(5),
		},
		create: {
			url: '/{{repositoryName}}/issues/{{issueId}}',
			title: '{{issueName}} · Issue #{{issueId}} · {{repositoryName}}',
		},
		check: {
			name: 'Issue #{{issueId}} {{repositoryName}}',
			title: '{{issueName}}',
			type: 'issue',
			typeName: 'Issue',
			provider: 'github',
		}
	},
	filterSearch: {
		variables: {
			search: () => faker.lorem.word({ length: { min: 2, max: 5 } }),
		},
		create: {
			url: '/search?q={{search}}',
			title: '{{search}}',
		},
		check: {
			name: 'Search {{search}}',
			title: '{{search}}',
			type: 'filter',
			typeName: 'Search',
			provider: 'github',
		}
	},
	filterPullRequests: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/pulls',
			title: 'Pull requests · {{repositoryName}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: 'Pull requests',
			type: 'filter',
			typeName: 'Pull requests',
			provider: 'github',
		}
	},
	filterIssues: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/issues',
			title: 'Issues · {{repositoryName}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: 'Issues',
			type: 'filter',
			typeName: 'Issues',
			provider: 'github',
		}
	},
	blobSearch: {
		variables: {
			search: () => faker.lorem.word({ length: { min: 2, max: 5 } }),
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/search?q={{search}}',
			title: '{{search}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{search}}',
			type: 'blob',
			typeName: 'Blob search',
			provider: 'github',
		}
	},
	blob: {
		variables: {
			branch: () => `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`,
			repositoryName: () => createRepositoryTemplate()[0],
			project: () => createRepositoryTemplate()[2],
			fileName: () => faker.system.fileName(),
		},
		create: {
			url: '/{{repositoryName}}/blob/{{branch}}/{{fileName}}',
			title: '{{project}}/{{fileName}} at {{branch}} · {{repositoryName}}',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{fileName}} at {{branch}}',
			type: 'blob',
			typeName: 'Blob',
			provider: 'github',
		}
	}
}

describe('utils/history/vcs/github', () => {
	checkProcessor(configs, 'unknown', unknown)
	checkProcessor(configs, 'tree', tree)
	checkProcessor(configs, 'topics', topics)
	checkProcessor(configs, 'settings', settings)
	checkProcessor(configs, 'repository', repository)
	checkProcessor(configs, 'pullRequest', pullRequest)
	checkProcessor(configs, 'profile', profile)
	checkProcessor(configs, 'issue', issue)
	checkProcessor(configs, 'filterSearch', filterSearch)
	checkProcessor(configs, 'filterPullRequests', filterPullRequests)
	checkProcessor(configs, 'filterIssues', filterIssues)
	checkProcessor(configs, 'blobSearch', blobSearch)
	checkProcessor(configs, 'blob', blob)
})
