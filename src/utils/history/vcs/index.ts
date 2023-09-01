import { VCSHistoryItem } from 'utils/history/types'
import { getConfigTypes, getUrl } from 'utils/history/helpers'
import { gitlabProcessConfig } from 'utils/history/vcs/gitlab'
import { githubProcessConfig } from 'utils/history/vcs/github'


function processDefaultGit(item: chrome.history.HistoryItem): VCSHistoryItem {
	const [url] = getUrl(item.url || '')

	return {
		...item,
		url,
		type: 'unknown',
		provider: 'unknown',
		name: '',
		title: item.title || '',
	}
}
export function processVCS(item: chrome.history.HistoryItem): VCSHistoryItem {
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
