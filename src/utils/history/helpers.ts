import memoize from 'lodash/memoize'
import findIndex from 'lodash/findIndex'
import type {
	ITSProviderType,
	ProcessConfig,
	VCSProviderType,
} from 'types/history'

function rawGetUrl(itemUrl: string): [URL, string[]] {
	const url = new URL(itemUrl)
	const path = url.pathname.split('/').filter(Boolean)

	return [
		url,
		path,
	]
}
export const getUrl = memoize(rawGetUrl)

function rawGetSplitTitle(title: string): string[] {
	const splitTitle = title?.split(' - ')

	splitTitle?.pop()

	return splitTitle
}
export const getSplitTitle = memoize(rawGetSplitTitle)

export function getConfigTypes<T = unknown, R = unknown>(config: ProcessConfig<T , R>) {
	return config.map(([, , type]) => type)
}

function sortBy<T extends { lastVisitTime?: number, visitCount?: number }>(a: T, b: T, key: 'lastVisitTime' | 'visitCount') {
	return (b[key] || 0) - (a[key] || 0)
}

export function sortByVisitCount<T extends { visitCount?: number }>(a: T, b: T) {
	return sortBy(a, b, 'visitCount')
}

export function sortByLastVisitTime<T extends { lastVisitTime?: number }>(a: T, b: T) {
	return sortBy(a, b, 'lastVisitTime')
}

export function filterItems<T extends { title: string }>(pinned: T[]) {
	return (item: T, index: number, array: T[]) =>
		array.findIndex(i => i.title === item.title) === index
		&& !pinned.find(pinnedItem => pinnedItem.title === item.title)
}

export function filterDisabledItems<T extends { typeName: string, provider: ITSProviderType | VCSProviderType | 'unknown' }>(disabled: Record<ITSProviderType | VCSProviderType, string[]>) {
	return (item: T) => {
		const { typeName, provider } = item

		if (!provider || provider === 'unknown') return true

		return !disabled[provider].includes(typeName)
	}
}

export function filterBySameId<T extends { id: string }>(value: T, index: number, array: T[]) {
	return index === findIndex(
		array,
		v => v.id === value.id
	)
}

export function movePinnedItemBetweenArrays<T extends { id: string }>(arrFrom: T[], arrTo: T[], id: string, pinned: boolean) {
	const item = arrFrom.find(item => item.id === id)

	return item
		? [
			arrFrom.filter(item => item.id !== id),
			[...arrTo, { ...item, pinned }],
		]
		: [arrFrom, arrTo]
}
