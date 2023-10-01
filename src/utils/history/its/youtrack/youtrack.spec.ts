import { faker } from '@faker-js/faker'
import { createFakeHistoryItem } from 'utils/history/history.fixtures'
import issue from 'utils/history/its/youtrack/issue'
import unknown from 'utils/history/its/youtrack/unknown'

describe('utils/history/its/youtrack', () => {
	test('unknown', () => {
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/fake-path/${faker.lorem.word({ length: { min: 2, max: 5 } })}`,
			title: fakeTitle,
		})

		expect(unknown[0](fakeHistoryItem)).toBeTruthy()

		const result = unknown[1](fakeHistoryItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('youtrack')
	})

	test('issue', () => {
		const fakeIssueId = `${faker.lorem.word(3).toUpperCase()}-${faker.number.int({ min: 1000, max: 999999 })}`
		const fakeTitle = faker.lorem.sentence()
		const fakeHistoryItem = createFakeHistoryItem({
			url: `{{internet.protocol}}://{{internet.domainName}}/issue/${fakeIssueId}`,
			title: `${fakeTitle}: ${fakeIssueId}`,
		})

		expect(issue[0](fakeHistoryItem)).toBeTruthy()

		const result = issue[1](fakeHistoryItem)

		expect(result.name).toBe(fakeIssueId)
		expect(result.title).toBe(fakeTitle)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('youtrack')
	})
})
