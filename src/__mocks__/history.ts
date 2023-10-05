import { faker } from '@faker-js/faker'
import type { HistoryItem } from 'types/history'

const getVariables = () => ({
	userName: faker.internet.userName(),
	repoName: faker.lorem.word(),
	fakePath: `/${faker.lorem.word()}/${faker.lorem.word()}/${faker.lorem.word()}`,
	project: faker.lorem.word(3).toUpperCase(),
	issueId: faker.string.numeric(4),
	summary: faker.lorem.sentence(),
	search: faker.lorem.sentence(),
	sub: faker.lorem.word(),
})
const defaultTemplates = [
	['{{internet.protocol}}://{{internet.domainName}}/{{fakePath}}', '{{lorem.sentences}}'],
	['{{internet.protocol}}://{{internet.domainName}}/{{fakePath}}', '{{fakePath}} % {{lorem.sentences}}'],
]
const templates = {
	'https://gitlab.com': [
		['https://gitlab.com/{{userName}}/{{repoName}}', '{{userName}} / {{repoName}} · GitLab'],
		['https://gitlab.com/{{fakePath}}', '{{fakePath}} · GitLab'],
	],
	'https://github.com': [
		['https://github.com/{{userName}}/{{repoName}}', '{{userName}}/{{repoName}}'],
		['https://github.com/{{fakePath}}', '{{fakePath}}'],
	],
	'https://jira.atlassian.com/': [
		['https://jira.atlassian.com/browse/{{project}}-{{issueId}}', '{{project}}-{{issueId}} - {{summary}} - Atlassian Jira'],
		['https://jira.atlassian.com/{{fakePath}}', '{{fakePath}} - Atlassian Jira'],
	],
	'https://youtrack.jetbrains.com/': [
		['https://youtrack.jetbrains.com/issue/{{project}}-{{issueId}}', '{{summary}}: YouTrack'],
		['https://youtrack.jetbrains.com/{{fakePath}}', '{{fakePath}}: YouTrack'],
	],
	'google': [
		['https://www.google.com/search?q={{search}}', '{{search}} - Google Search'],
		['https://www.google.com/search?q={{search}}', '{{search}} - Google Search'],
	],
	'reddit.com/r/dev': [
		['https://www.reddit.com/r/dev/{{sub}}', '{{lorem.sentence}} : {{sub}}'],
		['https://www.reddit.com/r/dev/{{sub}}', '{{lorem.sentence}} : {{sub}}'],
	],
	'https://web.dev': [
		['https://web.dev/{{sub}}', '{{lorem.sentence}} - {{sub}}'],
		['https://web.dev/{{sub}}', '{{lorem.sentence}} - {{sub}}'],
	],
}

export function createStateHistoryItem(text: string, pinned: boolean = false): HistoryItem {
	const historyItem = createHistoryItem(text)

	return {
		...historyItem,
		pinned,
		name: historyItem.title,
	}
}

export function createHistoryItem(text: string): Required<chrome.history.HistoryItem> {
	const variables = getVariables()
	const type = Math.floor(Math.random() * 2)
	const [url, title] = templates[text as keyof typeof templates]
		? templates[text as keyof typeof templates][type]
		: defaultTemplates[type]

	return {
		id: faker.string.nanoid(),
		title: faker.helpers.mustache(title, variables),
		url: faker.helpers.mustache(url, variables),
		visitCount: faker.number.int(9999),
		typedCount: faker.number.int(9999),
		lastVisitTime: faker.date.recent().getTime(),
	}
}
