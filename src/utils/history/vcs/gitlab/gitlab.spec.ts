import { faker } from '@faker-js/faker'
import capitalize from 'lodash/capitalize'
import { createRepositoryTemplate, checkProcessor } from 'utils/history/history.mock'
import unknown from 'utils/history/vcs/gitlab/unknown'
import tree from 'utils/history/vcs/gitlab/tree'
import repository from 'utils/history/vcs/gitlab/repository'
import profile from 'utils/history/vcs/gitlab/profile'
import pipelines from 'utils/history/vcs/gitlab/pipelines'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import jobs from 'utils/history/vcs/gitlab/jobs'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import commit from 'utils/history/vcs/gitlab/commit'
import { VCSHistoryItem } from 'types/history'
import type { TemplateConfig } from 'utils/history/history.mock'

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
			provider: 'gitlab',
		}
	},
	tree: {
		variables: {
			branch: () => faker.git.branch(),
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/tree/{{branch}}',
			title: 'Files · ${branch} · ${repositoryName}',
		},
		check: {
			name: '{{repositoryName}}',
			title: 'Files at ${branch}',
			type: 'tree',
			typeName: 'Tree',
			provider: 'gitlab',
		}
	},
	repository: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}',
			title: '{{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{repositoryName}}',
			type: 'repository',
			typeName: 'Repository',
			provider: 'gitlab',
		}
	},
	profile: {
		variables: {
			userName: () => faker.internet.userName(),
		},
		create: {
			url: '/{{userName}}',
			title: '{{userName}} · GitLab',
		},
		check: {
			name: 'profile',
			title: '{{userName}}',
			type: 'profile',
			typeName: 'Profile',
			provider: 'gitlab',
		}
	},
	pipelines: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			pipelineId: () => faker.string.numeric(6),
		},
		create: {
			url: '/{{repositoryName}}/-/pipelines/{{pipelineId}}',
			title: 'Pipeline · {{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}}',
			title: 'Pipeline {{pipelineId}}',
			type: 'pipeline',
			typeName: 'Pipelines',
			provider: 'gitlab',
		}
	},
	mergeRequest: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			mergeRequestId: () => faker.string.numeric(6),
			mergeRequestName: () => faker.lorem.sentence(),
		},
		create: {
			url: '/{{repositoryName}}/-/merge_requests/{{mergeRequestId}}',
			title: '{{mergeRequestName}} (!{{mergeRequestId}}) · Merge requests · {{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}} !{{mergeRequestId}}',
			title: '{{mergeRequestName}}',
			type: 'mergeRequest',
			typeName: 'Merge Request',
			provider: 'gitlab',
		}
	},
	jobs: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			jobId: () => faker.string.numeric(6),
			jobName: () => capitalize(faker.lorem.word()),
		},
		create: {
			url: '/{{repositoryName}}/-/jobs/{{jobId}}',
			title: '{{jobName}} (#{{jobId}}) · Jobs · {{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{jobName}} (#{{jobId}})',
			type: 'job',
			typeName: 'Jobs',
			provider: 'gitlab',
		}
	},
	filterMergeRequests: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
		},
		create: {
			url: '/{{repositoryName}}/-/merge_requests',
			title: 'Merge requests · {{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}}',
			title: 'Merge requests',
			type: 'filter',
			typeName: 'Merge requests',
			provider: 'gitlab',
		}
	},
	commit: {
		variables: {
			repositoryName: () => createRepositoryTemplate()[0],
			commitId: () => faker.git.commitSha(),
			commitName: () => faker.lorem.sentence(),
		},
		create: {
			url: '/{{repositoryName}}/-/commit/{{commitId}}',
			title: '{{commitName}} ({{commitId}}) · Commits · {{repositoryName}} · GitLab',
		},
		check: {
			name: '{{repositoryName}}',
			title: '{{commitName}} ({{commitId}})',
			type: 'commit',
			typeName: 'Commit',
			provider: 'gitlab',
		}
	},
}

describe('utils/history/vcs/gitlab', () => {
	checkProcessor(configs, 'unknown', unknown)
	checkProcessor(configs, 'tree', tree)
	checkProcessor(configs, 'repository', repository)
	checkProcessor(configs, 'profile', profile)
	checkProcessor(configs, 'pipelines', pipelines)
	checkProcessor(configs, 'mergeRequest', mergeRequest)
	checkProcessor(configs, 'jobs', jobs)
	checkProcessor(configs, 'filterMergeRequests', filterMergeRequests)
	checkProcessor(configs, 'commit', commit)
})
