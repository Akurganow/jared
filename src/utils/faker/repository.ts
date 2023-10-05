import { faker } from '@faker-js/faker'
import { BaseMock } from 'utils/faker/types'
import MockUser from 'utils/faker/user'
import MockProject from 'utils/faker/project'
import MockDomain from 'utils/faker/domain'
import type { MockUserItem } from 'utils/faker/user'
import type { MockProjectItem } from 'utils/faker/project'
import type { MockDomainItem } from 'utils/faker/domain'

export interface MockRepositoryClass extends BaseMock {
	getRepository(): MockRepositoryItem
	readonly user: MockUserItem
	readonly project: MockProjectItem
	readonly domain: MockDomainItem
}
export interface MockRepositoryItem {
	provider: string
	user: string
	project: string
	url: string
	templates: string[][]
	isSupported: boolean
}
export default class MockRepository implements MockRepositoryClass {
	public readonly user: MockUserItem
	public readonly project: MockProjectItem
	public readonly domain: MockDomainItem
	private repository: MockRepositoryItem

	private templates = {
		github: [
			['{{url}}/{{user}}/{{project}}', '{{user}}/{{project}}'],
			['{{url}}/{{fakePath}}', '{{fakePath}}'],
		],
		gitlab: [
			['{{url}}/{{user}}/{{project}}', '{{user}} / {{project}} · GitLab'],
			['{{url}}/{{fakePath}}', '{{fakePath}} · GitLab'],
		],
	}

	constructor(user?: MockUserItem, project?: MockProjectItem, domain?: MockDomainItem) {
		this.domain = domain ?? new MockDomain().getDomain()
		this.user = user ?? new MockUser(domain).getUser()
		this.project = project ?? new MockProject(domain).getProject()

		this.repository = this.createMockRepository()
	}

	private isProviderSupported() {
		return Boolean(this.providers
			.find(provider =>
				this.domain.name.includes(provider)
			)
		)
	}

	private supportedProvider() {
		const providers = this.providers

		return providers.find(provider => this.domain.name.includes(provider))
			?? providers[Math.floor(Math.random() * providers.length)]
	}

	private createMockRepository(): MockRepositoryItem {
		const provider = this.supportedProvider()
		const user = this.user.nickname.toLowerCase()
		const project = this.project.shortName.toLowerCase()
		const templatesArray = this.templates[provider as keyof typeof this.templates]
		const templates = templatesArray.map(templates =>
			templates.map(template => faker.helpers.mustache(template, {
				url: this.domain.full,
				user,
				project,
				summary: faker.lorem.sentence(),
			}))
		)

		return {
			provider,
			user,
			project,
			url: this.isProviderSupported()
				? `${this.domain.full}`
				: `https://${provider}.${project}.com`,
			templates,
			isSupported: this.isProviderSupported(),
		}
	}

	public get providers() {
		return ['github', 'gitlab']
	}

	public getRepository(): MockRepositoryItem {
		return this.repository
	}

	public reset() {
		this.repository = this.createMockRepository()
	}
}
