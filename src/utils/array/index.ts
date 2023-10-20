import { compareValues, filterBySameKeyValue } from '@plq/array-functions'

export function sortByVisitCount<T extends { visitCount?: number }>(a: T, b: T) {
	return a?.visitCount && b?.visitCount && compareValues(a.visitCount, b.visitCount) || 0
}

export function sortByLastVisitTime<T extends { lastVisitTime?: number }>(a: T, b: T) {
	return a?.lastVisitTime && b?.lastVisitTime && compareValues(a.lastVisitTime, b.lastVisitTime) || 0
}

export function sortByTypedCount<T extends { typedCount?: number }>(a: T, b: T) {
	return a?.typedCount && b?.typedCount && compareValues(a.typedCount, b.typedCount) || 0
}

export function filterBySameId<T extends { id: string }>(value: T, index: number, array: T[]) {
	return filterBySameKeyValue(value, index, array, 'id')
}
export function filterBySameTitle<T extends { title: string }>(value: T, index: number, array: T[]) {
	return filterBySameKeyValue(value, index, array, 'title')
}
