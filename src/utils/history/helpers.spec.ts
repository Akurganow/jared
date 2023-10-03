import { faker } from '@faker-js/faker'
import {
	filterBySameId,
	filterDisabledItems,
	filterItems,
	getConfigTypes,
	getSplitTitle,
	getUrl,
	movePinnedItemBetweenArrays,
	sortByLastVisitTime,
	sortByTypedCount,
	sortByVisitCount,
	isSortedBy,
} from 'utils/history/helpers'
import { ITSProviderType, ProcessConfigItem, VCSProviderType } from 'types/history'

const providers: (ITSProviderType | VCSProviderType)[] = ['github', 'gitlab', 'jira', 'youtrack']
const getFakeHistory = (count: number = 100) => faker.helpers.multiple(
	() => ({
		id: faker.string.nanoid(),
		visitCount: faker.number.int({ min: 0, max: 100 }),
		typedCount: faker.number.int({ min: 0, max: 100 }),
		lastVisitTime: faker.date.past().getTime(),
		title: faker.lorem.sentence(),
		url: faker.internet.url(),
		type: faker.helpers.arrayElement(['vcs', 'its']),
		typeName: faker.helpers.arrayElement(['Issue', 'Unknown']),
		provider: faker.helpers.arrayElement(providers),
	}),
	{ count },
)

describe('utils/history/helpers', () => {
	test('isSortedBy', () => {
		const visitCountItemsDesc = [{ visitCount: 3 }, { visitCount: 2 }, { visitCount: 1 }]
		const lastVisitTimeItemsDesc = [{ lastVisitTime: 3 }, { lastVisitTime: 2 }, { lastVisitTime: 1 }]
		const typedCountItemsDesc = [{ typedCount: 3 }, { typedCount: 2 }, { typedCount: 1 }]
		const visitCountItemsAsc = [{ visitCount: 1 }, { visitCount: 2 }, { visitCount: 3 }]
		const lastVisitTimeItemsAsc = [{ lastVisitTime: 1 }, { lastVisitTime: 2 }, { lastVisitTime: 3 }]
		const typedCountItemsAsc = [{ typedCount: 1 }, { typedCount: 2 }, { typedCount: 3 }]
		const visitCountItemsUnsorted = [{ visitCount: 1 }, { visitCount: 3 }, { visitCount: 2 }]
		const lastVisitTimeItemsUnsorted = [{ lastVisitTime: 1 }, { lastVisitTime: 3 }, { lastVisitTime: 2 }]
		const typedCountItemsUnsorted = [{ typedCount: 1 }, { typedCount: 3 }, { typedCount: 2 }]

		expect(isSortedBy(visitCountItemsDesc, 'visitCount')).toBeTruthy()
		expect(isSortedBy(lastVisitTimeItemsDesc, 'lastVisitTime')).toBeTruthy()
		expect(isSortedBy(typedCountItemsDesc, 'typedCount')).toBeTruthy()

		expect(isSortedBy(visitCountItemsAsc, 'visitCount', 'asc')).toBeTruthy()
		expect(isSortedBy(lastVisitTimeItemsAsc, 'lastVisitTime', 'asc')).toBeTruthy()
		expect(isSortedBy(typedCountItemsAsc, 'typedCount', 'asc')).toBeTruthy()

		expect(isSortedBy(visitCountItemsUnsorted, 'visitCount')).toBeFalsy()
		expect(isSortedBy(lastVisitTimeItemsUnsorted, 'lastVisitTime')).toBeFalsy()
		expect(isSortedBy(typedCountItemsUnsorted, 'typedCount')).toBeFalsy()
	})

	test('getUrl', () => {
		const { internet } = faker
		const protocol = internet.protocol()
		const hostname = internet.domainName()
		const pathname = `${internet.domainWord()}/${internet.domainWord()}`
		const fakeUrl = `${protocol}://${hostname}/${pathname}`
		const [url, path] = getUrl(fakeUrl)

		expect(url.toString()).toBe(fakeUrl)
		expect(url.protocol).toBe(`${protocol}:`)
		expect(url.hostname).toBe(hostname)
		expect(url.pathname).toBe(`/${pathname}`)
		expect(path).toHaveLength(2)
	})

	test('getSplitTitle', () => {
		const text = faker.lorem.sentence()
		const title = `${text} - Some text`
		const splitTitle = getSplitTitle(title)

		expect(splitTitle).toHaveLength(1)
		expect(splitTitle).not.toContain(title)
		expect(splitTitle).toContain(text)
	})

	test('filterItems', () => {
		const items = getFakeHistory()
		const pinned = items.slice(0, 10)
		const filtered = items.filter(filterItems(pinned))

		expect(filtered).toHaveLength(90)
		expect(filtered).not.toContain(pinned[0])
		expect(filtered).not.toContain(pinned[9])
	})

	test('filterDisabledItems', () => {
		const items = getFakeHistory()
		const disabled = {
			jira: ['Unknown'],
			youtrack: ['Unknown'],
			github: ['Unknown'],
			gitlab: ['Unknown'],
		}
		const filtered = items.filter(filterDisabledItems(disabled))

		expect(filtered).not.toHaveLength(100)
		expect(filtered).not.toContain(items.find(({ typeName }) => typeName === 'unknown'))
	})

	test('filterBySameId', () => {
		const items = getFakeHistory()
		const doubled = [...items, ...items]
		const filtered = doubled.filter(filterBySameId)

		expect(filtered).toHaveLength(100)
		expect(filtered).toContain(items[0])
	})

	test('movePinnedItemBetweenArrays', () => {
		const items = getFakeHistory()
		const pinned = items.slice(0, 10)
		const filtered = items.filter(filterItems(pinned))
		const movedId = filtered[0].id
		const [arrFrom, arrTo ] = movePinnedItemBetweenArrays(filtered, pinned, movedId, true)

		expect(arrFrom).toHaveLength(filtered.length - 1)
		expect(arrTo).toHaveLength(pinned.length + 1)
		expect(arrFrom.find(item => item.id === movedId)).toBeUndefined()
		expect(arrTo.find(item => item.id === movedId)).toBeDefined()
	})

	test('getConfigTypes', () => {
		const typesArray = ['one', 'two']
		const config = faker.helpers.multiple(
			() => [
				(value: string) => Boolean(value),
				(value: string) => value,
				{
					type: faker.helpers.arrayElement(typesArray),
					name: faker.lorem.word(),
				}
			] as ProcessConfigItem<string, string>,
			{ count: 10 },
		)
		const types = getConfigTypes(config)
			.map(({ type }) => type)

		expect(types).toHaveLength(10)
		expect(types).toContain(typesArray[0])
		expect(types).toContain(typesArray[1])
	})

	test('sortByVisitCount', () => {
		const items = getFakeHistory()

		const sorted = items.sort(sortByVisitCount)

		expect(isSortedBy(sorted, 'visitCount')).toBeTruthy()
	})

	test('sortByLastVisitTime', () => {
		const items = getFakeHistory()

		const sorted = items.sort(sortByLastVisitTime)

		expect(isSortedBy(sorted, 'lastVisitTime')).toBeTruthy()
	})

	test('sortByTypedCount', () => {
		const items = getFakeHistory()

		const sorted = items.sort(sortByTypedCount)

		expect(isSortedBy(sorted, 'typedCount')).toBeTruthy()
	})
})
