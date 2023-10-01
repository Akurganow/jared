import { faker } from '@faker-js/faker'
import capitalize from 'lodash/capitalize'
import { createFakeHistoryItem, createUrlTemplate } from 'utils/history/history.fixtures'
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
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/fake-path/${faker.lorem.word()}`),
			title: fakeTitle,
		})

		expect(unknown[0](fakeHistoryItem)).toBeTruthy()

		const result = unknown[1](fakeHistoryItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('gitlab')
	})

	test('tree', () => {
		const fakeBranch = faker.git.branch()
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/tree/${fakeBranch}`),
			title: `Files · ${fakeBranch} · ${fakeRepository}`,
		})

		expect(tree[0](fakeHistoryItem)).toBeTruthy()

		const result = tree[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`Files at ${fakeBranch}`)
		expect(result.type).toBe('tree')
		expect(result.typeName).toBe('Tree')
		expect(result.provider).toBe('gitlab')
	})

	test('repository', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}`),
			title: `${fakeRepository} · GitLab`,
		})

		expect(repository[0](fakeHistoryItem)).toBeTruthy()

		const result = repository[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(fakeRepository)
		expect(result.type).toBe('repository')
		expect(result.typeName).toBe('Repository')
		expect(result.provider).toBe('gitlab')
	})

	test('profile', () => {
		const fakeUsername = faker.internet.userName()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeUsername}`),
			title: `${fakeUsername} · GitLab`,
		})

		expect(profile[0](fakeHistoryItem)).toBeTruthy()

		const result = profile[1](fakeHistoryItem)

		expect(result.name).toBe('profile')
		expect(result.title).toBe(fakeUsername)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('gitlab')
	})

	test('pipelines', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakePipelineId = faker.number.int({ min: 1 })
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/-/pipelines/${fakePipelineId}`),
			title: `Pipeline · ${fakeRepository} · GitLab`,
		})

		expect(pipelines[0](fakeHistoryItem)).toBeTruthy()

		const result = pipelines[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`Pipeline ${fakePipelineId}`)
		expect(result.type).toBe('pipeline')
		expect(result.typeName).toBe('Pipelines')
		expect(result.provider).toBe('gitlab')
	})

	test('mergeRequest', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeMergeRequestId = faker.number.int({ min: 1, max: 999999 })
		const fakeMergeRequestName = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/-/merge_requests/${fakeMergeRequestId}`),
			title: `${fakeMergeRequestName} (!${fakeMergeRequestId}) · Merge requests · ${fakeRepository} · GitLab`,
		})

		expect(mergeRequest[0](fakeHistoryItem)).toBeTruthy()

		const result = mergeRequest[1](fakeHistoryItem)

		expect(result.name).toBe(`${fakeRepository} !${fakeMergeRequestId}`)
		expect(result.title).toBe(`${fakeMergeRequestName}`)
		expect(result.type).toBe('mergeRequest')
		expect(result.typeName).toBe('Merge Request')
		expect(result.provider).toBe('gitlab')
	})

	test('jobs', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeJobId = faker.number.int({ min: 1 })
		const fakeJobName = capitalize(faker.lorem.word())
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/-/jobs/${fakeJobId}`),
			title: `${fakeJobName} (#${fakeJobId}) · Jobs · RND / rwc · GitLab`,
		})

		expect(jobs[0](fakeHistoryItem)).toBeTruthy()

		const result = jobs[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`${fakeJobName} (#${fakeJobId})`)
		expect(result.type).toBe('job')
		expect(result.typeName).toBe('Jobs')
		expect(result.provider).toBe('gitlab')
	})

	test('filterMergeRequests', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/-/merge_requests`),
			title: `Merge requests · ${fakeRepository} · GitLab`,
		})

		expect(filterMergeRequests[0](fakeHistoryItem)).toBeTruthy()

		const result = filterMergeRequests[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe('Merge requests')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Merge requests')
		expect(result.provider).toBe('gitlab')
	})

	test('commit', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeCommitId = faker.git.commitSha()
		const fakeCommitName = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/-/commit/${fakeCommitId}`),
			title: `${fakeCommitName} (${fakeCommitId.slice(0, 7)}) · Commits · ${fakeRepository} · GitLab`,
		})

		expect(commit[0](fakeHistoryItem)).toBeTruthy()

		const result = commit[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`${fakeCommitName} (${fakeCommitId.slice(0, 7)})`)
		expect(result.type).toBe('commit')
		expect(result.typeName).toBe('Commit')
		expect(result.provider).toBe('gitlab')
	})
})
