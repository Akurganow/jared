import { ITSHistoryItem, ProcessConfig, VCSHistoryItem } from 'types/history'
import { Browser, HistoryItem, HistoryQuery } from '../types'

export default class History {
	private readonly browser: Browser = window.browser ? window.browser : window.chrome

	constructor() {}

	public async search(query: chrome.history.HistoryQuery) {
		return (await this.browser.history.search(query))
		// Do not remove next code, it's need for screenshots in future
		// .map(item => {
		// 	return {
		// 		...item,
		// 		title: (item.title as string)
		// 			.replace(new RegExp('rwc', 'ig'), 'JWE')
		// 			.replace(new RegExp('rcv', 'ig'), 'AER')
		// 			.replace(new RegExp('Ringcentral', 'ig'), 'Jared')
		// 			.replace(new RegExp('rise', 'ig'), 'provider')
		// 			.replace(new RegExp('partner', 'ig'), 'provider')
		// 			.replace(new RegExp('biz', 'ig'), 'us-east-1')
		// 			.replace(new RegExp('brand', 'ig'), 'provider')
		// 			.replace(new RegExp('faviconVideo', 'ig'), 'favicon')
		// 			.replace(/(\d{3,})/ig, (match) => (Math.floor(parseInt(match) / 2)).toString())
		// 			.replace('BSS', 'ESS')
		// 			.replace('RU', 'ES')
		// 			.replace('RC', 'JW')
		// 			.replace('Web 3', 'Web Ext'),
		// 		url: (item.url as string)
		// 			.replace(new RegExp('rwc', 'ig'), 'JWE')
		// 			.replace(new RegExp('rcv', 'ig'), 'AER')
		// 			.replace('BSS', 'ESS')
		// 			.replace(new RegExp('Ringcentral', 'ig'), 'Jared')
		// 			.replace(new RegExp('gitops', 'ig'), 'ops')
		// 			.replace(/(\d{3,})/ig, (match) => (Math.floor(parseInt(match) / 2)).toString())
		// 			.replace('RU', 'ES'),
		// 	}
		// })
	}

	public async getItems(queries: HistoryQuery) {
		let results: HistoryItem[]

		if (Array.isArray(queries)) {
			results = (await Promise.all(queries.map(query => this.search(query)))).flat()
		} else {
			results = await this.search(queries)
		}

		return results
	}

	public async getProcessedItems<T extends VCSHistoryItem | ITSHistoryItem>(queries: HistoryQuery, config: ProcessConfig<HistoryItem, T>) {
		let results: HistoryItem[]

		if (Array.isArray(queries)) {
			results = (await Promise.all(queries.map(query => this.search(query)))).flat()
		} else {
			results = await this.search(queries)
		}

		return this.processItems(results, config)
	}

	private processItems<T extends VCSHistoryItem | ITSHistoryItem>(items: HistoryItem[], config: ProcessConfig<HistoryItem, T>) {
		return items.map(item => {
			const processor = config.find(([test]) => test(item)) as typeof config[number]

			return processor?.[1](item)
		}).filter(Boolean) as T[]
	}

	// public async getProcessedItems(queries: Queries, config?: ProcessConfig<HistoryItem, VCSHistoryItem | ITSHistoryItem | HistoryItem>): Promise<Results[]> {
	// 	const results = await this.search(queries)
	// 	const items = results.flat()
	//
	// 	if (config) {
	// 		return this.processItems(items, config)
	// 	}
	//
	// 	return items.map(itemProcessor)
	// }
}
