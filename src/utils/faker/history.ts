import { faker } from '@faker-js/faker'
import MockDomain from 'utils/faker/domain'
import MockUser from 'utils/faker/user'
import MockProject from 'utils/faker/project'
import MockRepository from 'utils/faker/repository'
import MockTracker from 'utils/faker/tracker'
import type { MockDomainItem } from 'utils/faker/domain'
import type { MockUserItem } from 'utils/faker/user'
import type { MockProjectItem } from 'utils/faker/project'
import type { MockRepositoryItem } from 'utils/faker/repository'
import type { MockTrackerItem } from 'utils/faker/tracker'
import type { BaseMock } from 'utils/faker/types'

export interface MockHistoryClass extends BaseMock {
	getHistory(): MockHistoryItem[]
}
export interface MockHistoryQuery extends chrome.history.HistoryQuery {}
export interface MockHistoryItem extends chrome.history.HistoryItem {}

type HistoryVariables = Record<string, string>

export default class MockHistory implements MockHistoryClass {
	public readonly query?: MockHistoryQuery
	private readonly domain: MockDomainItem
	private readonly user: MockUserItem
	private readonly project: MockProjectItem
	private readonly repository: MockRepositoryItem
	private readonly tracker: MockTrackerItem
	private variables: HistoryVariables
	private history: MockHistoryItem[]

	private templates = ['{{url}}/{{fakePath}}', '{{lorem.sentence}} - {{fakePath}}']

	constructor(query?: MockHistoryQuery) {
		this.query = query
		this.domain = new MockDomain(this.query?.text).getDomain()
		this.user = new MockUser(this.domain).getUser()
		this.project = new MockProject(this.domain).getProject()
		this.repository = new MockRepository(this.user, this.project, this.domain).getRepository()
		this.tracker = new MockTracker(this.user, this.project, this.domain).getTracker()
		this.variables = this.createVariables()
		this.history = this.createMockHistory()
	}

	private createVariables() {
		return {
			url: this.domain.full,
			fakePath: `${faker.lorem.word()}/${faker.lorem.word()}/${faker.lorem.word()}`,
			search: faker.lorem.sentence(),
			sub: faker.lorem.word(),
		}
	}

	private getTemplates(): string[] {
		const repositoryTemplates = this.repository.isSupported
			? this.repository.templates[Math.floor(Math.random() * this.repository.templates.length)]
			: null
		const trackerTemplates = this.tracker.isSupported
			? this.tracker.templates[Math.floor(Math.random() * this.tracker.templates.length)]
			: null

		return repositoryTemplates || trackerTemplates || this.templates
	}

	private getTitle(): string {
		const [, titleTemplate] = this.getTemplates()

		return faker.helpers.mustache(titleTemplate, this.variables)
	}

	private getUrl(): string {
		const [urlTemplate] = this.getTemplates()

		return faker.helpers.mustache(urlTemplate, this.variables)
	}

	private createMockHistoryItem(): MockHistoryItem {
		const title = this.getTitle()
		const url = this.getUrl()
		const from = this.query?.startTime
			? new Date(this.query.startTime)
			: faker.date.recent()
		const to = this.query?.endTime
			? new Date(this.query.endTime)
			: new Date()

		return {
			id: faker.string.nanoid(),
			title,
			url,
			lastVisitTime: faker.date.between({ from, to, }).getTime(),
			visitCount: faker.number.int(9999),
			typedCount: faker.number.int(9999),
		}
	}

	private createMockHistory(): MockHistoryItem[] {
		return faker.helpers.multiple(
			() => this.createMockHistoryItem(),
			{ count: this.query?.maxResults ?? 10 }
		)
	}

	public getHistory(): MockHistoryItem[] {
		return this.history
	}

	public reset() {
		this.variables = this.createVariables()
		this.history = this.createMockHistory()
	}
}
