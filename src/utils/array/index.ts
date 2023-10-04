import findIndex from 'lodash/findIndex'

function sortBy<T extends { [k in string]: unknown }>(a: T, b: T, key: keyof T, order: 'asc' | 'desc' = 'asc') {
	if (a[key] === b[key]) return 0

	const aValue = a[key]
	const bValue = b[key]

	if (typeof aValue !== typeof bValue) throw new Error(`Types are not equal (a: ${typeof aValue}, b: ${typeof bValue})`)

	switch (typeof aValue) {
	case 'string':
		return order === 'asc'
			? (aValue as string).localeCompare(bValue as string)
			: (bValue as string).localeCompare(aValue as string)
	case 'number':
		return order === 'asc'
			? (aValue as number) - (bValue as number)
			: (bValue as number) - (aValue as number)
	default:
		return 0
	}
}

export function sortByVisitCount<T extends { visitCount?: number }>(a: T, b: T) {
	return sortBy(a, b, 'visitCount')
}

export function sortByLastVisitTime<T extends { lastVisitTime?: number }>(a: T, b: T) {
	return sortBy(a, b, 'lastVisitTime')
}

export function sortByTypedCount<T extends { typedCount?: number }>(a: T, b: T) {
	return sortBy(a, b, 'typedCount')
}

function filterBySameKey<T extends { [k in string]: unknown }>(value: T, index: number, array: T[], key: keyof T) {
	return index === findIndex(
		array,
		v => v[key] === value[key]
	)
}

export function filterBySameId<T extends { id: string }>(value: T, index: number, array: T[]) {
	return filterBySameKey(value, index, array, 'id')
}

export function isSortedBy<T extends object>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc') {
	return array.every((item, index) => {
		if (index === 0) return true

		if (order === 'asc') {
			return item[key] >= array[index - 1][key]
		} else {
			return item[key] <= array[index - 1][key]
		}
	})
}
