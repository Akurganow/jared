import { faker } from '@faker-js/faker'
import type { ProcessConfigItem } from 'types/history'

type Template<T> = Partial<{ [K in keyof T]: string }>

export function createUrlTemplate(path: string) {
	return `{{internet.protocol}}://{{internet.domainName}}${path}`
}

export function checkHistoryItem<T, I extends chrome.history.HistoryItem>(historyItem: I, processor:  ProcessConfigItem<I, T>): T {
	const [check, parse] = processor

	expect(check(historyItem)).toBeTruthy()

	return parse(historyItem)
}

export function createFakeHistoryItem(template: Template<chrome.history.HistoryItem>) {
	const templateEntries = Object.entries(template)
	const historyItem = {
		id: faker.string.nanoid(),
		lastVisitTime: faker.date.recent().getTime(),
		visitCount: faker.number.int(9999),
		typedCount: faker.number.int(9999),
	}

	templateEntries.forEach(([key, value]) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		historyItem[key] = faker.helpers.fake(value)
	})

	return historyItem as chrome.history.HistoryItem
}

export function createRepositoryTemplate() {
	const userName = faker.internet.userName()
	const repoName = faker.lorem.word({ length: { min: 2, max: 5 } })

	return [`${userName}/${repoName}`, userName, repoName]
}
