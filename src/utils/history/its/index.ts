import { ITSHistoryItem } from '../types'
import { getConfigTypes, getUrl } from '../helpers'
import { jiraProcessConfig } from './jira'

function processDefaultTicket(item: chrome.history.HistoryItem): ITSHistoryItem {
	return {
		...item,
		type: 'unknown',
		name: '',
		title: item.title || '',
		provider: 'unknown',
	}
}
export function processITS(item: chrome.history.HistoryItem): ITSHistoryItem {
	const [url] = getUrl(item.url || '')

	// TODO: support syntax 'jira https://jira.atlassian.com/) \n jira https://jira.mycompany.com'
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
