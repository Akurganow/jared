import { faker } from '@faker-js/faker'
import { BaseMock } from 'utils/faker/types'
import MockUser from 'utils/faker/user'
import MockProject from 'utils/faker/project'
import MockDomain from 'utils/faker/domain'
import type { MockUserItem } from 'utils/faker/user'
import type { MockProjectItem } from 'utils/faker/project'
import type { MockDomainItem } from 'utils/faker/domain'

export interface MockTrackerClass extends BaseMock {
	getTracker(): MockTrackerItem
	readonly user: MockUserItem
	readonly project: MockProjectItem
	readonly domain: MockDomainItem
}
export interface MockTrackerItem {
	provider: string
	user: string
	project: string
	path: string
	url: string
	templates: string[][]
	isSupported: boolean
}
export default class MockTracker implements MockTrackerClass {
	public readonly user: MockUserItem
	public readonly project: MockProjectItem
	public readonly domain: MockDomainItem
	private tracker: MockTrackerItem

	private templates = {
		jira: [
			['{{url}}/browse/{{abbreviation}}-{{issueId}}', '{{abbreviation}}-{{issueId}} - {{summary}} - Atlassian Jira'],
			['{{url}}/{{fakePath}}', '{{fakePath}} - Atlassian Jira'],
		],
		youtrack: [
			['{{url}}/issue/{{abbreviation}}-{{issueId}}', '{{summary}}: YouTrack'],
			['{{url}}/{{fakePath}}', '{{fakePath}}: YouTrack'],
		],
	}

	constructor(user?: MockUserItem, project?: MockProjectItem, domain?: MockDomainItem) {
		this.domain = domain ?? new MockDomain().getDomain()
		this.user = user ?? new MockUser(domain).getUser()
		this.project = project ?? new MockProject(domain).getProject()

		this.tracker = this.createMockTracker()
	}

	private isProviderSupported() {
		return Boolean(this.providers
			.find(provider =>
				this.domain.name.includes(provider)
			)
		)
	}

	public supportedProvider() {
		const providers = this.providers

		return providers.find(provider => this.domain.name.includes(provider))
			?? providers[Math.floor(Math.random() * providers.length)]
	}

	private createMockTracker(): MockTrackerItem {
		const provider = this.supportedProvider()
		const user = this.user.nickname.toLowerCase()
		const project = this.project.shortName.toLowerCase()
		const templatesArray = this.templates[provider as keyof typeof this.templates]
		const templates = templatesArray.map(templates =>
			templates.map(template => faker.helpers.mustache(template, {
				url: this.domain.full,
				abbreviation: this.project.abbreviation,
				issueId: faker.string.numeric(5),
				summary: faker.lorem.sentence(),
			}))
		)

		return {
			provider,
			user,
			project,
			path: `${user}/${project}`,
			url: this.isProviderSupported()
				? `${this.domain.full}/${user}/${project}`
				: `https://${provider}.com/${user}/${project}`,
			templates,
			isSupported: this.isProviderSupported(),
		}
	}

	public get providers() {
		return ['jira', 'youtrack']
	}

	public getTracker(): MockTrackerItem {
		return this.tracker
	}

	public reset() {
		this.tracker = this.createMockTracker()
	}
}
