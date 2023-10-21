import { ITSHistoryItem, ProcessConfig, VCSHistoryItem } from 'types/history'
import { Browser, HistoryItem, HistoryQuery } from '../types'

export default class History {
	private readonly browser: Browser = window.browser ? window.browser : window.chrome

	constructor() {}

	public async search(query: chrome.history.HistoryQuery) {
		return await this.browser.history.search(query)
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
