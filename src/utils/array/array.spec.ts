import { faker } from '@faker-js/faker'
import { filterBySameId, isSortedBy, sortByLastVisitTime, sortByTypedCount, sortByVisitCount } from 'utils/array'

function getFake<T extends { [k in string]: () => unknown }>(
	template: T,
	options: Parameters<typeof faker.helpers.multiple>[1] = { count: 100 }
): { [k in keyof T]: ReturnType<typeof template[keyof T]> }[] {
	return faker.helpers.multiple(
		() => {
			const keys = Object.keys(template) as (keyof T)[]

			return keys.reduce(
				(acc, key) => ({
					...acc,
					[key]: template[key](),
				}), {} as { [k in keyof T]: ReturnType<typeof template[keyof T]> })
		},
		options
	)
}
describe('utils/history/array', () => {
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

	test('filterBySameId', () => {
		const items = getFake({ id: faker.string.nanoid })
		const doubled = [...items, ...items]
		const filtered = doubled.filter(filterBySameId)

		expect(filtered).toHaveLength(100)
		expect(filtered).toContain(items[0])
	})

	test('sortByVisitCount', () => {
		const items = getFake({ visitCount: faker.number.int })

		const sorted = items.sort(sortByVisitCount)

		expect(isSortedBy(sorted, 'visitCount')).toBeTruthy()
	})

	test('sortByTypedCount', () => {
		const items = getFake({ typedCount: faker.number.int })

		const sorted = items.sort(sortByTypedCount)

		expect(isSortedBy(sorted, 'typedCount')).toBeTruthy()
	})

	test('sortByLastVisitTime', () => {
		const items = getFake({ lastVisitTime: () => faker.date.past().getTime() })

		const sorted = items.sort(sortByLastVisitTime)

		expect(isSortedBy(sorted, 'lastVisitTime')).toBeTruthy()
	})
})
