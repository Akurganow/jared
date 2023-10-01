import { faker } from '@faker-js/faker'
import { createFakeHistoryItem, createUrlTemplate } from 'utils/history/history.fixtures'
import issue from 'utils/history/its/youtrack/issue'
import unknown from 'utils/history/its/youtrack/unknown'

describe('utils/history/its/youtrack', () => {
	test('unknown', () => {
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate('/fake-path/{{lorem.word()}}'),
			title: title,
		})
		const [check, parse] = unknown

		expect(check(historyItem)).toBeTruthy()

		const result = parse(historyItem)

		expect(result.name).toBe('')
		expect(result.title).toBe(title)
		expect(result.type).toBe('unknown')
		expect(result.typeName).toBe('Unknown')
		expect(result.provider).toBe('youtrack')
	})

	test('issue', () => {
		const issueId = `${faker.lorem.word(3).toUpperCase()}-${faker.number.int({ min: 1000, max: 999999 })}`
		const title = faker.lorem.sentence()
		const historyItem = createFakeHistoryItem({
			url: createUrlTemplate(`/issue/${issueId}`),
			title: `${title}: ${issueId}`,
		})
		const [check, parse] = issue

		expect(check(historyItem)).toBeTruthy()

		const result = parse(historyItem)

		expect(result.name).toBe(issueId)
		expect(result.title).toBe(title)
		expect(result.type).toBe('issue')
		expect(result.typeName).toBe('Issue')
		expect(result.provider).toBe('youtrack')
	})
})
