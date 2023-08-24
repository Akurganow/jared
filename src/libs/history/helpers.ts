import memoize from 'lodash/memoize'
import { ProcessConfig } from './types'

function rawGetUrl(itemUrl: string): [URL, string[]] {
	const url = new URL(itemUrl)
	const path = url.pathname.split('/').filter(Boolean)

	return [
		url,
		path,
	]
}

export const getUrl = memoize(rawGetUrl)

export function getConfigTypes<T = unknown, R = unknown>(config: ProcessConfig<T , R>) {
	return config.map(([, , type]) => type)
}
