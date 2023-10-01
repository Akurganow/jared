import { faker } from '@faker-js/faker'
import { createFakeHistoryItem, createUrlTemplate } from 'utils/history/history.fixtures'
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

describe('utils/history/vcs/github', () => {
	test('unknown', () => {
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/fake-path/${faker.lorem.word({ length: { min: 2, max: 5 } })}`),
			title: fakeTitle,
		})

		expect(unknown[0](fakeHistoryItem)).toBeTruthy()

		const result = unknown[1](fakeHistoryItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('github')
	})

	test('tree', () => {
		const fakeBranch = `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/tree/${fakeBranch}`),
			title: `${fakeRepository} at ${fakeBranch}`,
		})

		expect(tree[0](fakeHistoryItem)).toBeTruthy()

		const result = tree[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(fakeBranch)
		expect(result.type).toBe('tree')
		expect(result.typeName).toBe('Tree')
		expect(result.provider).toBe('github')
	})

	test('topics', () => {
		const fakeTopic = faker.git.branch()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/topics/${fakeTopic}`),
			title: `${fakeTopic} · GitHub Topics`,
		})

		expect(topics[0](fakeHistoryItem)).toBeTruthy()

		const result = topics[1](fakeHistoryItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(fakeTopic)
		expect(result.type).toBe('topics')
		expect(result.typeName).toBe('Topics')
		expect(result.provider).toBe('github')
	})

	test('settings', () => {
		const fakePath = faker.lorem.word({ length: { min: 2, max: 5 } })
		const fakeTitle = `${fakePath.toUpperCase()} settings`
		const fakeHistoryItem = createFakeHistoryItem({
			id: '{{string.nanoid}}',
			url: `{{internet.url}}/settings/${fakePath}`,
			title: fakeTitle,
		})

		expect(settings[0](fakeHistoryItem)).toBeTruthy()

		const result = settings[1](fakeHistoryItem)

		expect(result.name).toBe(`settings/${fakePath}`)
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('settings')
		expect(result.typeName).toBe('Settings')
		expect(result.provider).toBe('github')
	})

	test('repository', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}`),
			title: fakeRepository,
		})

		expect(repository[0](fakeHistoryItem)).toBeTruthy()

		const result = repository[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(fakeRepository)
		expect(result.type).toBe('repository')
		expect(result.typeName).toBe('Repository')
		expect(result.provider).toBe('github')
	})

	test('pullRequest', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakePullRequest = faker.git.branch()
		const fakePullRequestId = faker.number.int({ min: 1, max: 999999 })
		const fakePullRequestName = faker.lorem.sentence()
		const fakeBotName = faker.person.firstName()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/pull/${fakePullRequest}`),
			title: `${fakePullRequestName} by ${fakeBotName}[bot] · Pull Request #${fakePullRequestId} · ${fakeRepository}`,
		})

		expect(pullRequest[0](fakeHistoryItem)).toBeTruthy()

		const result = pullRequest[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`${fakePullRequestName} by ${fakeBotName}[bot]`)
		expect(result.type).toBe('pullRequest')
		expect(result.typeName).toBe('Pull request')
		expect(result.provider).toBe('github')
	})

	test('profile', () => {
		const fakeUsername = faker.internet.userName()
		const fakeFullName = faker.person.fullName()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeUsername}`),
			title: `${fakeUsername} (${fakeFullName})`,
		})

		expect(profile[0](fakeHistoryItem)).toBeTruthy()

		const result = profile[1](fakeHistoryItem)

		expect(result.name).toBe('profile')
		expect(result.title).toBe(`${fakeUsername} (${fakeFullName})`)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('github')
	})

	test('issue', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeIssueId = faker.number.int({ min: 1, max: 999999 })
		const fakeIssueName = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/issues/${fakeIssueId}`),
			title: `${fakeIssueName} · Issue #${fakeIssueId} · ${fakeRepository}`,
		})

		expect(issue[0](fakeHistoryItem)).toBeTruthy()

		const result = issue[1](fakeHistoryItem)

		expect(result.name).toBe(`Issue #${fakeIssueId} ${fakeRepository}`)
		expect(result.title).toBe(fakeIssueName)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('github')
	})

	test('filterSearch', () => {
		const fakeSearch = faker.lorem.word({ length: { min: 2, max: 5 } })
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/search?q=${fakeSearch}`),
			title: `${fakeSearch}`,
		})

		expect(filterSearch[0](fakeHistoryItem)).toBeTruthy()

		const result = filterSearch[1](fakeHistoryItem)

		expect(result.name).toBe(`Search ${fakeSearch}`)
		expect(result.title).toBe(fakeSearch)
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Search')
		expect(result.provider).toBe('github')
	})

	test('filterPullRequests', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/pulls`),
			title: `Pull requests · ${fakeRepository}`,
		})

		expect(filterPullRequests[0](fakeHistoryItem)).toBeTruthy()

		const result = filterPullRequests[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe('Pull requests')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Pull requests')
		expect(result.provider).toBe('github')
	})

	test('filterIssues', () => {
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/issues`),
			title: `Issues · ${fakeRepository}`,
		})

		expect(filterIssues[0](fakeHistoryItem)).toBeTruthy()

		const result = filterIssues[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe('Issues')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Issues')
		expect(result.provider).toBe('github')
	})

	test('blobSearch', () => {
		const fakeSearch = faker.lorem.word({ length: { min: 2, max: 5 } })
		const fakeRepository = `${faker.lorem.word({ length: { min: 2, max: 5 } })}/${faker.lorem.word({ length: { min: 2, max: 5 } })}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/search?q=${fakeSearch}`),
			title: `${fakeSearch}`,
		})

		expect(blobSearch[0](fakeHistoryItem)).toBeTruthy()

		const result = blobSearch[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(fakeSearch)
		expect(result.type).toBe('blob')
		expect(result.typeName).toBe('Blob search')
		expect(result.provider).toBe('github')
	})

	test('blob', () => {
		const fakeBranch = `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`
		const fakeUsername = faker.internet.userName()
		const fakeRepoName = faker.lorem.word({ length: { min: 2, max: 5 } })
		const fakeRepository = `${fakeUsername}/${fakeRepoName}`
		const fakeHistoryItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${fakeRepository}/blob/${fakeBranch}/README.md`),
			title: `${fakeRepoName}/README.md at ${fakeBranch} · ${fakeRepository}`,
		})

		expect(blob[0](fakeHistoryItem)).toBeTruthy()

		const result = blob[1](fakeHistoryItem)

		expect(result.name).toBe(fakeRepository)
		expect(result.title).toBe(`README.md at ${fakeBranch}`)
		expect(result.type).toBe('blob')
		expect(result.typeName).toBe('Blob')
		expect(result.provider).toBe('github')
	})
})
