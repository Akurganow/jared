import memoize from 'lodash/memoize'
import type { ITSProviderType, ProcessConfig, VCSProviderType, } from 'types/history'

function rawGetUrl(itemUrl: string): [URL | undefined, string[]] {
	if (!itemUrl) return [
		undefined,
		[],
	]

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

export function filterItems<T extends { title: string }>(filterFrom: T[]) {
	return (item: T, index: number, array: T[]) =>
		array.findIndex(i => i.title === item.title) === index
		&& !filterFrom.find(fItem => fItem.title === item.title)
}

export function filterDisabledItems<T extends { typeName: string, provider: ITSProviderType | VCSProviderType | 'unknown' }>(disabled: Record<ITSProviderType | VCSProviderType, string[]>) {
	return (item: T) => {
		const { typeName, provider } = item

		if (!provider || provider === 'unknown') return true

		return !disabled[provider].includes(typeName)
	}
}

export function movePinnedItemBetweenArrays<T extends { id: string }>(arrFrom: T[], arrTo: T[], id: string) {
	const item = arrFrom.find(item => item.id === id)

	return item
		? [
			arrFrom.filter(i => i.id !== id),
			[...arrTo, { ...item }],
		]
		: [arrFrom, arrTo]
}

