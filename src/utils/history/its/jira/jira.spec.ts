import { faker } from '@faker-js/faker'
import { createFakeHistoryItem } from 'utils/history/history.fixtures'
import dashboard from 'utils/history/its/jira/dashboard'
import filter from 'utils/history/its/jira/filter'
import issue from 'utils/history/its/jira/issue'
import profile from 'utils/history/its/jira/profile'
import project from 'utils/history/its/jira/project'
import rapidBoard from 'utils/history/its/jira/rapidBoard'
import unknown from 'utils/history/its/jira/unknown'

describe('utils/history/its/jira', () => {
	test('unknown', () => {
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/fake-path/${faker.lorem.word({ length: { min: 2, max: 5 } })}`,
			title: `${fakeTitle} - {{lorem.word}} JIRA`,
		})

		expect(unknown[0](fakeHistoryItem)).toBeTruthy()

		const result = unknown[1](fakeHistoryItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('jira')
	})

	test('rapidBoard', () => {
		const fakeViewId = faker.number.int({ min: 1000, max: 999999 })
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/secure/RapidBoard.jspa?rapidView=${fakeViewId}`,
			title: `${fakeTitle} - {{lorem.word}} JIRA`,
		})

		expect(rapidBoard[0](fakeHistoryItem)).toBeTruthy()

		const result = rapidBoard[1](fakeHistoryItem)

		expect(result.name).toBe(`board #${fakeViewId}`)
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('board')
		expect(result.typeName).toBe('Board')
		expect(result.provider).toBe('jira')
	})

	test('project', () => {
		const fakeProjectId = faker.lorem.word({ length: { min: 2, max: 5 } }).toUpperCase()
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/projects/${fakeProjectId}/issues`,
			title: `${fakeTitle} - {{lorem.word}} JIRA`,
		})

		expect(project[0](fakeHistoryItem)).toBeTruthy()

		const result = project[1](fakeHistoryItem)

		expect(result.name).toBe(fakeProjectId)
		expect(result.title).toBe(fakeProjectId)
		expect(result.type).toBe('project')
		expect(result.typeName).toBe('Project')
		expect(result.provider).toBe('jira')
	})

	test('profile', () => {
		const fakeFirstName = faker.person.firstName()
		const fakeLastName = faker.person.lastName()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/secure/ViewProfile.jspa?name=${fakeFirstName}.${fakeLastName}`,
			title: `User Profile: ${fakeFirstName} ${fakeLastName} - {{lorem.word}} JIRA`,
		})

		expect(profile[0](fakeHistoryItem)).toBeTruthy()

		const result = profile[1](fakeHistoryItem)

		expect(result.name).toBe(`${fakeFirstName} ${fakeLastName}`)
		expect(result.title).toBe(`${fakeFirstName} ${fakeLastName}`)
		expect(result.type).toBe('profile')
		expect(result.typeName).toBe('Profile')
		expect(result.provider).toBe('jira')
	})

	test('issue', () => {
		const fakeIssueId = `${faker.lorem.word(3).toUpperCase()}-${faker.number.int({ min: 1000, max: 999999 })}`
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/browse/${fakeIssueId}`,
			title: `${fakeTitle} - {{lorem.word}} JIRA`,
		})

		expect(issue[0](fakeHistoryItem)).toBeTruthy()

		const result = issue[1](fakeHistoryItem)

		expect(result.name).toBe(`${fakeIssueId}`)
		expect(result.title).toBe(`${fakeTitle}`)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('jira')
	})

	test('filter', () => {
		const fakeFilterId = faker.number.int({ min: 1000, max: 999999 })
		const fakeFilterName = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/issues/?filter=${fakeFilterId}`,
			title: `[${fakeFilterName}] Issue Navigator - {{lorem.word}} JIRA`,
		})

		expect(filter[0](fakeHistoryItem)).toBeTruthy()

		const result = filter[1](fakeHistoryItem)

		expect(result.name).toBe(`filter #${fakeFilterId}`)
		expect(result.title).toBe(fakeFilterName)
		expect(result.type).toBe('filter')
		expect(result.typeName).toBe('Filter')
		expect(result.provider).toBe('jira')
	})

	test('dashboard', () => {
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: '{{internet.protocol}}://{{internet.domainName}}/secure/Dashboard.jspa?selectPageId={{string.numeric(5)}}',
			title: `${fakeTitle} - {{lorem.word}} JIRA`,
		})

		expect(dashboard[0](fakeHistoryItem)).toBeTruthy()

		const result = dashboard[1](fakeHistoryItem)

		expect(result.name).toBe('board')
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('board')
		expect(result.typeName).toBe('Dashboard')
		expect(result.provider).toBe('jira')
	})
})
