import { GitHistoryItem } from '../types'
import { getConfigTypes, getUrl } from '../helpers'
import { gitlabProcessConfig } from './gitlab'
import { githubProcessConfig } from './github'


function processDefaultGit(item: chrome.history.HistoryItem): GitHistoryItem {
	const [url] = getUrl(item.url || '')

	return {
		...item,
		url,
		type: 'unknown',
		vcs: 'unknown',
		name: item.title || '',
		title: item.title || '',
	}
}
export function processGit(item: chrome.history.HistoryItem): GitHistoryItem {
	const [url] = getUrl(item.url || '')

	switch (true) {
	case (url.pathname.includes('github-copilot')): {
		return processDefaultGit(item)
	}
	case (item.title?.toLowerCase().includes('gitlab')): {
		const index = gitlabProcessConfig.findIndex(([condition]) => condition(item))

		if (index < 0) {
			return processDefaultGit(item)
		}	else {
			const [, process] = gitlabProcessConfig[index]
			return process(item)
		}
	}
	case (url.hostname === 'github.com'): {
		const index = githubProcessConfig.findIndex(([condition]) => condition(item))

		if (index < 0) {
			return processDefaultGit(item)
		}	else {
			const [, process] = githubProcessConfig[index]
			return process(item)
		}
	}
	default: {
		return processDefaultGit(item)
	}
	}
}

export const gitConfigTypes = {
	gitlab: getConfigTypes(gitlabProcessConfig),
	github: getConfigTypes(githubProcessConfig),
}
