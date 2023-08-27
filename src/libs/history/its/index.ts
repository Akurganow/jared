import { ITSHistoryItem } from '../types'
import { getConfigTypes, getUrl } from '../helpers'
import { jiraProcessConfig } from './jira'

function processDefaultTicket(item: chrome.history.HistoryItem): ITSHistoryItem {
	const [url] = getUrl(item.url || '')

	return {
		...item,
		url,
		type: 'unknown',
		name: item.title || '',
		title: item.title || '',
	}
}
export function processTicket(item: chrome.history.HistoryItem): ITSHistoryItem {
	const [url] = getUrl(item.url || '')

	switch (true) {
	case (url.hostname.includes('jira')): {
		const index = jiraProcessConfig.findIndex(([condition]) => condition(item))

		if (index < 0) {
			return processDefaultTicket(item)
		}	else {
			const [, process] = jiraProcessConfig[index]

			return process(item)
		}
	}
	default: {
		return processDefaultTicket(item)
	}
	}
}

export const ticketsConfigTypes = {
	jira: getConfigTypes(jiraProcessConfig)
}
