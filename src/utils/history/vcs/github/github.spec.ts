import { faker } from '@faker-js/faker'
import {
	createFakeHistoryItem,
	createUrlTemplate,
	createRepositoryTemplate,
	checkHistoryItem
} from 'utils/history/history.fixtures'
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
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/fake-path/${faker.lorem.word({ length: { min: 2, max: 5 } })}`),
			title: title,
		})

		const result = checkHistoryItem(historyItem, unknown)

		expect(result.name).toBe('')
		expect(result.title).toBe(title)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('github')
	})

	test('tree', () => {
		const branch = `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/tree/${branch}`),
			title: `${repositoryName} at ${branch}`,
		})

		const result = checkHistoryItem(historyItem, tree)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(branch)
		expect(result.type).toBe('tree')
		expect(result.typeName).toBe('Tree')
		expect(result.provider).toBe('github')
	})

	test('topics', () => {
		const topic = faker.git.branch()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/topics/${topic}`),
			title: `${topic} · GitHub Topics`,
		})

		const result = checkHistoryItem(historyItem, topics)

		expect(result.name).toBe('')
		expect(result.title).toBe(topic)
		expect(result.type).toBe('topics')
		expect(result.typeName).toBe('Topics')
		expect(result.provider).toBe('github')
	})

	test('settings', () => {
		const path = faker.lorem.word({ length: { min: 2, max: 5 } })
		const title = `${path.toUpperCase()} settings`
		const historyItem = createFakeHistoryItem({
			id: '{{string.nanoid}}',
			url: `{{internet.url}}/settings/${path}`,
			title: title,
		})

		const result = checkHistoryItem(historyItem, settings)

		expect(result.name).toBe(`settings/${path}`)
		expect(result.title).toBe(title)
		expect(result.type).toBe('settings')
		expect(result.typeName).toBe('Settings')
		expect(result.provider).toBe('github')
	})

	test('repository', () => {
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}`),
			title: repositoryName,
		})

		const result = checkHistoryItem(historyItem, repository)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(repositoryName)
		expect(result.type).toBe('repository')
		expect(result.typeName).toBe('Repository')
		expect(result.provider).toBe('github')
	})

	test('pullRequest', () => {
		const [repositoryName] = createRepositoryTemplate()
		const pullRequestId = faker.number.int({ min: 1, max: 999999 })
		const pullRequestName = faker.lorem.sentence()
		const botName = faker.person.firstName()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/pull/${pullRequestId}`),
			title: `${pullRequestName} by ${botName}[bot] · Pull Request #${pullRequestId} · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, pullRequest)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`${pullRequestName} by ${botName}[bot]`)
		expect(result.type).toBe('pullRequest')
		expect(result.typeName).toBe('Pull request')
		expect(result.provider).toBe('github')
	})

	test('profile', () => {
		const userName = faker.internet.userName()
		const fullName = faker.person.fullName()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${userName}`),
			title: `${userName} (${fullName})`,
		})

		const result = checkHistoryItem(historyItem, profile)

		expect(result.name).toBe('profile')
		expect(result.title).toBe(`${userName} (${fullName})`)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('github')
	})

	test('issue', () => {
		const [repositoryName] = createRepositoryTemplate()
		const issueId = faker.number.int({ min: 1, max: 999999 })
		const issueName = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/issues/${issueId}`),
			title: `${issueName} · Issue #${issueId} · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, issue)

		expect(result.name).toBe(`Issue #${issueId} ${repositoryName}`)
		expect(result.title).toBe(issueName)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('github')
	})

	test('filterSearch', () => {
		const fakeSearch = faker.lorem.word({ length: { min: 2, max: 5 } })
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/search?q=${fakeSearch}`),
			title: `${fakeSearch}`,
		})

		const result = checkHistoryItem(historyItem, filterSearch)

		expect(result.name).toBe(`Search ${fakeSearch}`)
		expect(result.title).toBe(fakeSearch)
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Search')
		expect(result.provider).toBe('github')
	})

	test('filterPullRequests', () => {
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/pulls`),
			title: `Pull requests · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, filterPullRequests)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe('Pull requests')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Pull requests')
		expect(result.provider).toBe('github')
	})

	test('filterIssues', () => {
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/issues`),
			title: `Issues · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, filterIssues)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe('Issues')
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Issues')
		expect(result.provider).toBe('github')
	})

	test('blobSearch', () => {
		const search = faker.lorem.word({ length: { min: 2, max: 5 } })
		const [repositoryName] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/search?q=${search}`),
			title: `${search}`,
		})

		const result = checkHistoryItem(historyItem, blobSearch)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(search)
		expect(result.type).toBe('blob')
		expect(result.typeName).toBe('Blob search')
		expect(result.provider).toBe('github')
	})

	test('blob', () => {
		const branch = `dependabot/npm_and_yarn/@faker-js/faker/${faker.git.branch()}-1.1.1`
		const [repositoryName,, project] = createRepositoryTemplate()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/${repositoryName}/blob/${branch}/README.md`),
			title: `${project}/README.md at ${branch} · ${repositoryName}`,
		})

		const result = checkHistoryItem(historyItem, blob)

		expect(result.name).toBe(repositoryName)
		expect(result.title).toBe(`README.md at ${branch}`)
		expect(result.type).toBe('blob')
		expect(result.typeName).toBe('Blob')
		expect(result.provider).toBe('github')
	})
})
