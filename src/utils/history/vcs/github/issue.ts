import { getUrl } from 'utils/history/helpers'
import type { ProcessConfigItem, VCSHistoryItem } from 'types/history'

function getIssueName(path: string[]) {
	const repoName = `${path[0]}/${path[1]}`

	if (path.includes('new')) {
		return 'New Issue'
	}
	if (path[path.length - 1] === 'issues') {
		return 'Issues'
	}

	return `Issue #${path[path.length - 1]} ${repoName}`
}

const processor: ProcessConfigItem<chrome.history.HistoryItem, VCSHistoryItem> = [
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return path.includes('issues')
	},
	(item: chrome.history.HistoryItem) => {
		const [, path] = getUrl(item.url || '')

		return {
			...item,
			provider: 'github',
			type: 'issue',
			typeName: 'Issue',
			name: getIssueName(path),
			title: item.title || 'Issue',
		} },
	{
		type: 'issue',
		name: 'Issue',
	},
]
export default processor
