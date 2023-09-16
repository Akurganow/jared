import memoize from 'lodash/memoize'
import { jiraProcessConfig } from 'utils/history/its/jira'
import { HistoryQuery } from 'src/types/history'
import { gitlabProcessConfig } from 'utils/history/vcs/gitlab'
import { githubProcessConfig } from 'utils/history/vcs/github'

const vcsConfigs = {
	gitlab: gitlabProcessConfig,
	github: githubProcessConfig,
}
const itsConfigs = {
	jira: jiraProcessConfig,
}
export const getVCSQueries = memoize((query: string) =>
	query
		.split('\n')
		.filter(Boolean)
		.map((line): HistoryQuery => {
			const [query, type, maxResults] = line.trim().split(' ')
			const config = vcsConfigs[type as keyof typeof vcsConfigs]

			return {
				type: type as HistoryQuery['type'],
				text: query,
				maxResults: parseInt(maxResults, 10),
				...(!config ? { error: new Error(`Unknown type: ${type}`) } : {}),
			}
		})
)
export const getITSQueries = memoize((query: string) =>
	query
		.split('\n')
		.filter(Boolean)
		.map((line): HistoryQuery => {
			const [query, type, maxResults] = line.trim().split(' ')
			const config = itsConfigs[type as keyof typeof itsConfigs]

			return {
				type: type as HistoryQuery['type'],
				text: query,
				maxResults: parseInt(maxResults, 10),
				...(!config ? { error: new Error(`Unknown type: ${type}`) } : {}),
			}
		})
)
