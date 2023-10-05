import { faker } from '@faker-js/faker'
import { BaseMock } from 'utils/faker/types'

export interface MockDomainClass extends BaseMock {
	getDomain(): MockDomainItem
}
export interface MockDomainItem {
	protocol: string
	name: string
	suffix: string
	domainName: string
	full: string
}
export default class MockDomain implements MockDomainClass {
	private domain: MockDomainItem
	private readonly text: string

	constructor(text?: string) {
		this.text = text ?? ''
		this.domain = this.createDomain()
	}

	private createDomain(): MockDomainItem {
		const protocol = this.text?.match(/(https?|ftp):\/\//)?.[1] ?? faker.internet.protocol()

		let domainName = protocol
			? this.text?.replace(`${protocol}://`, '')
			: this.text
		domainName = domainName?.replace(/\/$/im, '')
		const hasWWW = domainName?.match(/^www\./im)
		domainName = hasWWW
			? domainName?.replace(/^www\./im, '')
			: domainName

		const domainNameMatch = domainName?.match(/^(.+)\.(.+)$/im)
		const name = domainNameMatch
			? domainNameMatch?.[1]
			: domainName.length > 0
				? domainName
				: faker.internet.domainWord()
		const suffix = domainNameMatch?.[2] ?? faker.internet.domainSuffix()

		return {
			protocol,
			name,
			suffix,
			domainName: `${name}.${suffix}`,
			full: `${protocol}://${hasWWW ? 'www.' : ''}${name}.${suffix}`,
		}
	}

	public getDomain(): MockDomainItem {
		return this.domain
	}
	public reset() {
		this.domain = this.createDomain()
	}
}
