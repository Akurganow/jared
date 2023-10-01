import { faker } from '@faker-js/faker'
import capitalize from 'lodash/capitalize'
import {
	checkHistoryItem,
	createFakeHistoryItem,
	createRepositoryTemplate,
	createUrlTemplate
} from 'utils/history/history.fixtures'
import unknown from 'utils/history/vcs/gitlab/unknown'
import tree from 'utils/history/vcs/gitlab/tree'
import repository from 'utils/history/vcs/gitlab/repository'
import profile from 'utils/history/vcs/gitlab/profile'
import pipelines from 'utils/history/vcs/gitlab/pipelines'
import mergeRequest from 'utils/history/vcs/gitlab/mergeRequest'
import jobs from 'utils/history/vcs/gitlab/jobs'
import filterMergeRequests from 'utils/history/vcs/gitlab/filter-mergeRequests'
import commit from 'utils/history/vcs/gitlab/commit'

describe('utils/history/vcs/gitlab', () => {
	test('unknown', () => {
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/fake-path/${faker.lorem.word()}`),
			title: title,
		})

		const result = checkHistoryItem(historyItem, unknown)

		expect(result.name).toBe('')
		expect(result.title).toBe(title)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('gitlab')
	})

	test('tree', () => {
		const branch = faker.git.branch()
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/tree/${branch}`),
			title: `Files · ${branch} · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, tree)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`Files at ${branch}`)
		expect(result.type).toBe('tree')
		expect(result.typeName).toBe('Tree')
		expect(result.provider).toBe('gitlab')
	})

	test('repository', () => {
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}`),
			title: `${repositoryName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, repository)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(repositoryName)
		expect(result.type).toBe('repository')
		expect(result.typeName).toBe('Repository')
		expect(result.provider).toBe('gitlab')
	})

	test('profile', () => {
		const userName = faker.internet.userName()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${userName}`),
			title: `${userName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, profile)

		expect(result.name).toBe('profile')
		expect(result.title).toBe(userName)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('gitlab')
	})

	test('pipelines', () => {
		const [repositoryName] = createRepositoryTemplate()
		const pipelineId = faker.number.int({ min: 1 })
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/-/pipelines/${pipelineId}`),
			title: `Pipeline · ${repositoryName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, pipelines)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`Pipeline ${pipelineId}`)
		expect(result.type).toBe('pipeline')
		expect(result.typeName).toBe('Pipelines')
		expect(result.provider).toBe('gitlab')
	})

	test('mergeRequest', () => {
		const [repositoryName] = createRepositoryTemplate()
		const fakeMergeRequestId = faker.number.int({ min: 1, max: 999999 })
		const fakeMergeRequestName = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/-/merge_requests/${fakeMergeRequestId}`),
			title: `${fakeMergeRequestName} (!${fakeMergeRequestId}) · Merge requests · ${repositoryName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, mergeRequest)

		expect(result.name).toBe(`${repositoryName} !${fakeMergeRequestId}`)
		expect(result.title).toBe(`${fakeMergeRequestName}`)
		expect(result.type).toBe('mergeRequest')
		expect(result.typeName).toBe('Merge Request')
		expect(result.provider).toBe('gitlab')
	})

	test('jobs', () => {
		const [repositoryName] = createRepositoryTemplate()
		const jobId = faker.number.int({ min: 1 })
		const jobName = capitalize(faker.lorem.word())
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/-/jobs/${jobId}`),
			title: `${jobName} (#${jobId}) · Jobs · RND / rwc · GitLab`,
		})

		const result = checkHistoryItem(historyItem, jobs)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`${jobName} (#${jobId})`)
		expect(result.type).toBe('job')
		expect(result.typeName).toBe('Jobs')
		expect(result.provider).toBe('gitlab')
	})

	test('filterMergeRequests', () => {
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/-/merge_requests`),
			title: `Merge requests · ${repositoryName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, filterMergeRequests)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe('Merge requests')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Merge requests')
		expect(result.provider).toBe('gitlab')
	})

	test('commit', () => {
		const [repositoryName] = createRepositoryTemplate()
		const commitId = faker.git.commitSha()
		const commitName = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/-/commit/${commitId}`),
			title: `${commitName} (${commitId.slice(0, 7)}) · Commits · ${repositoryName} · GitLab`,
		})

		const result = checkHistoryItem(historyItem, commit)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`${commitName} (${commitId.slice(0, 7)})`)
		expect(result.type).toBe('commit')
		expect(result.typeName).toBe('Commit')
		expect(result.provider).toBe('gitlab')
	})
})
