import { faker } from '@faker-js/faker'
import { checkHistoryItem, createFakeHistoryItem, createUrlTemplate } from 'utils/history/history.fixtures'
import dashboard from 'utils/history/its/jira/dashboard'
import filter from 'utils/history/its/jira/filter'
import issue from 'utils/history/its/jira/issue'
import profile from 'utils/history/its/jira/profile'
import project from 'utils/history/its/jira/project'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import unknown from 'utils/history/its/jira/unknown'

describe('utils/history/its/jira', () => {
	test('unknown', () => {
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate('/fake-path/{{lorem.word()}}'),
			title: `${title} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, unknown)

		expect(result.name).toBe('')
		expect(result.title).toBe(title)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('jira')
	})

	test('rapidBoard', () => {
		const viewId = faker.number.int({ min: 1000, max: 999999 })
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/secure/RapidBoard.jspa?rapidView=${viewId}`),
			title: `${title} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, rapidBoard)

		expect(result.name).toBe(`board #${viewId}`)
		expect(result.title).toBe(title)
		expect(result.type).toBe('board')
		expect(result.typeName).toBe('Board')
		expect(result.provider).toBe('jira')
	})

	test('project', () => {
		const projectId = faker.lorem.word({ length: { min: 2, max: 5 } }).toUpperCase()
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/projects/${projectId}/issues`),
			title: `${title} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, project)

		expect(result.name).toBe(projectId)
		expect(result.title).toBe(projectId)
		expect(result.type).toBe('project')
		expect(result.typeName).toBe('Project')
		expect(result.provider).toBe('jira')
	})

	test('profile', () => {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/secure/ViewProfile.jspa?name=${firstName}.${lastName}`),
			title: `User Profile: ${firstName} ${lastName} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, profile)

		expect(result.name).toBe(`${firstName} ${lastName}`)
		expect(result.title).toBe(`${firstName} ${lastName}`)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('jira')
	})

	test('issue', () => {
		const issueId = `${faker.lorem.word(3).toUpperCase()}-${faker.number.int({ min: 1000, max: 999999 })}`
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/browse/${issueId}`),
			title: `${title} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, issue)

		expect(result.name).toBe(`${issueId}`)
		expect(result.title).toBe(`${title}`)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('jira')
	})

	test('filter', () => {
		const filterId = faker.number.int({ min: 1000, max: 999999 })
		const filterName = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/issues/?filter=${filterId}`),
			title: `[${filterName}] Issue Navigator - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, filter)

		expect(result.name).toBe(`filter #${filterId}`)
		expect(result.title).toBe(filterName)
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Filter')
		expect(result.provider).toBe('jira')
	})

	test('dashboard', () => {
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate('/secure/Dashboard.jspa?selectPageId={{string.numeric(5)}}'),
			title: `${title} - {{lorem.word}} JIRA`,
		})

		const result = checkHistoryItem(historyItem, dashboard)

		expect(result.name).toBe('board')
		expect(result.title).toBe(title)
		expect(result.type).toBe('board')
		expect(result.typeName).toBe('Dashboard')
		expect(result.provider).toBe('jira')
	})
})
