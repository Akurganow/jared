import { faker } from '@faker-js/faker'
import type { ProcessConfigItem } from 'types/history'

type Template<T> = Partial<{ [K in keyof T]: string }>

type Config<I> = {
	variables: { [K in string]: () => string }
	create: TemplateCreate
	check: Template<I>
}

export type TemplateCreate = {
	url: chrome.history.HistoryItem['url'],
	title: chrome.history.HistoryItem['title'],
}
export type TemplateConfig<I> = Record<string, Config<I>>

export function createUrlTemplate(path: string) {
	return faker.helpers.fake(`{{internet.protocol}}://{{internet.domainName}}${path}`)
}

export function checkParsedTemplates<I>(
	item: I,
	expectConfig: Config<I>['check'],
	variables: Config<I>['variables'],
) {
	const expectEntries: [string, string][] = Object.entries(expectConfig)

	expectEntries.forEach(([key, template]) => {
		const value = faker.helpers.mustache(template, variables ?? {})

		test(`check ${key} to be ${value}`, () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			expect(item[key]).toBe(value)
		})
	})
}

export function checkHistoryItem<I>(
	trueHistoryItem: chrome.history.HistoryItem,
	falseHistoryItems: { key: string, item: chrome.history.HistoryItem }[],
	processor:  ProcessConfigItem<chrome.history.HistoryItem, I>,
	expectConfig: Config<I>,
): void {
	const [check, parse] = processor

	test('check true item', () => {
		expect(check(trueHistoryItem)).toBeTruthy()
	})

	falseHistoryItems.forEach(item => {
		test(`check false item for ${item.key}`, () => {
			expect(check(item.item)).toBeFalsy()
		})
	})

	checkParsedTemplates<I>(
		parse(trueHistoryItem),
		expectConfig.check,
		expectConfig.variables
	)
}

export function createFakeHistoryItem<I>(template: Template<chrome.history.HistoryItem>, variables: Config<I>['variables'] ) {
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
		historyItem[key] = faker.helpers.mustache(value, variables ?? {})
	})

	return historyItem as chrome.history.HistoryItem
}

export function createRepositoryTemplate() {
	const userName = faker.internet.userName()
	const repoName = faker.lorem.word({ length: { min: 2, max: 5 } })

	return [`${userName}/${repoName}`, userName, repoName]
}

export function checkProcessor<I>(
	configs: TemplateConfig<I>,
	key: keyof TemplateConfig<I>,
	processors: ProcessConfigItem<chrome.history.HistoryItem, I>,
) {
	describe(key, () => {
		const falseConfigs = Object.keys(configs)
			.filter((k) => k !== key)
			.map((k) => {
				const { variables, create } = configs[k]
				const processedCreate = {
					url: createUrlTemplate(faker.helpers.mustache(create.url, variables)),
					title: faker.helpers.mustache(create.title, variables),
				}
				return {
					key: k,
					item: createFakeHistoryItem<I>(processedCreate, variables)
				}
			})

		const { variables, create, check } = configs[key]
		const processedVariables = Object.entries(variables)
			.reduce((acc, [key, value]) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
				acc[key] = value()
				return acc
			}, {} as typeof variables)
		const processedCreate = {
			url: createUrlTemplate(faker.helpers.mustache(create.url, processedVariables)),
			title: faker.helpers.mustache(create.title, processedVariables),
		} as typeof create

		const historyItem = createFakeHistoryItem<I>(processedCreate, processedVariables)

		checkHistoryItem<I>(
			historyItem,
			falseConfigs,
			processors,
			{
				variables: processedVariables,
				create: processedCreate,
				check,
			},
		)
	})
}
