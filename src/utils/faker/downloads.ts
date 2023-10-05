import { faker } from '@faker-js/faker'
import { BaseMock } from 'utils/faker/types'

export interface MockDownloadsClass extends BaseMock {
	getDownloads(): MockDownloadItem[]

	getItem(): MockDownloadItem
}

export interface MockDownloadItem extends chrome.downloads.DownloadItem {
}

export interface MockDownloadQuery extends chrome.downloads.DownloadQuery {
}

type FileUrl = {
	url: string
	finalUrl: string
	mimeType: string
	filename: string
	referrer: string
}
type FileDates = {
	startTime: string
	estimatedEndTime?: string
	endTime: string
}

const downloadStates = ['in_progress', 'complete', 'interrupted'] as chrome.downloads.DownloadState[]
const dangerTypes = ['file', 'url', 'content', 'uncommon', 'host', 'unwanted', 'safe'] as chrome.downloads.DangerType[]
const interruptReasons = ['FILE_FAILED', 'FILE_ACCESS_DENIED', 'FILE_NO_SPACE', 'FILE_NAME_TOO_LONG', 'FILE_TOO_LARGE', 'FILE_VIRUS_INFECTED', 'FILE_TRANSIENT_ERROR', 'FILE_BLOCKED', 'FILE_SECURITY_CHECK_FAILED', 'FILE_TOO_SHORT', 'FILE_HASH_MISMATCH', 'FILE_SAME_AS_SOURCE', 'NETWORK_FAILED', 'NETWORK_TIMEOUT', 'NETWORK_DISCONNECTED', 'NETWORK_SERVER_DOWN', 'NETWORK_INVALID_REQUEST', 'SERVER_FAILED', 'SERVER_NO_RANGE', 'SERVER_BAD_CONTENT', 'SERVER_UNAUTHORIZED', 'SERVER_CERT_PROBLEM', 'SERVER_FORBIDDEN', 'SERVER_UNREACHABLE', 'SERVER_CONTENT_LENGTH_MISMATCH', 'SERVER_CROSS_ORIGIN_REDIRECT', 'USER_CANCELED', 'USER_SHUTDOWN', 'CRASH'] as chrome.downloads.DownloadInterruptReason[]

export default class MockDownloads implements MockDownloadsClass {
	public readonly query: MockDownloadQuery
	private downloads: MockDownloadItem[] = []

	constructor(query?: MockDownloadQuery) {
		this.query = query ?? {}
		this.downloads = this.createMockDownloads()
	}

	private getFileUrl(): FileUrl {
		const domain = faker.internet.url( { appendSlash: false })
		const uuid = faker.string.uuid()
		const mimeType = faker.system.mimeType()
		const fileExt = faker.system.fileExt(mimeType)
		const fileName = faker.system.fileName({ extensionCount: 0 })
		const directoryPath = faker.system.directoryPath()
		const filePath = `${directoryPath}/${fileName}.${fileExt}`
		const finalUrl = `${domain}/${uuid}${filePath}`
		const finalPath = faker.helpers.arrayElement([
			directoryPath,
			`/${uuid}${directoryPath}`,
			'/downloads',
			`/downloads/${uuid}`,
			`/downloads/${uuid}${directoryPath}`,
		])
		const referrerDomain = faker.helpers.arrayElement([
			domain,
			`${domain}/downloads`,
			faker.internet.url({ appendSlash: false }),
		])
		const url = this.query.url ?? `${domain}${finalPath}/${fileName}`
		const referrer = `${referrerDomain}${finalPath}`

		return {
			url,
			finalUrl,
			mimeType,
			referrer,
			filename: `${fileName}.${fileExt}`,
		}
	}

	private getDates(): FileDates {
		const yearAgo = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000).getTime()

		const startedAfter = this.query.startedAfter
			? new Date(this.query.startedAfter).getTime() + 1
			: undefined
		const startedBefore = this.query.startedBefore
			? new Date(this.query.startedBefore).getTime() - 1
			: undefined
		const endedBefore = this.query.endedBefore
			? new Date(this.query.endedBefore).getTime() - 1
			: undefined
		const endedAfter = this.query.endedAfter
			? new Date(this.query.endedAfter).getTime() + 1
			: undefined
		const minStartTime = startedAfter ?? endedAfter ?? new Date(yearAgo)
		const maxStartTime = startedBefore ?? endedBefore ?? Math.max(
			new Date(minStartTime).getTime(),
			new Date(this.query.startedBefore ?? yearAgo).getTime(),
			faker.date.recent().getTime(),
		)
		const startTime = new Date(this.query.startTime ?? startedAfter ?? faker.date.between({
			from: minStartTime,
			to: maxStartTime,
		})).toISOString()

		const startTimeGreater = new Date(startTime).getTime() + 1
		const minEndTime = endedAfter ?? startTimeGreater
		const inProgressEndTime = this.query.state === 'in_progress'
			? faker.date.future({ refDate: startTimeGreater })
			: faker.date.between({ from: minEndTime, to: startTimeGreater })
		const maxEndTime = endedBefore ?? inProgressEndTime

		const endTime = new Date(this.query.endTime ?? faker.date.between({
			from: minEndTime,
			to: maxEndTime,
		})).toISOString()
		const estimatedEndTime = this.query.endTime || endedAfter || endedBefore
			? undefined
			: endTime

		return {
			startTime,
			estimatedEndTime,
			endTime,
		}
	}

	private createMockDownloadItem(): MockDownloadItem {
		const state = this.query.state as chrome.downloads.DownloadState
			?? faker.helpers.arrayElement(downloadStates)
		const {
			url,
			filename,
			finalUrl,
			mimeType,
			referrer,
		} = this.getFileUrl()
		const {
			startTime,
			estimatedEndTime,
			endTime,
		} = this.getDates()

		const fileSize = faker.number.int()

		return {
			id: faker.number.int(),
			state,
			error: state === 'interrupted' ? faker.helpers.arrayElement(interruptReasons) : undefined,
			mime: mimeType,
			referrer,
			url,
			finalUrl,
			filename,
			fileSize,
			danger: this.query.danger as chrome.downloads.DangerType ?? faker.helpers.arrayElement(dangerTypes),
			bytesReceived: this.query.bytesReceived ?? state === 'complete' ? fileSize : faker.number.int({ max: fileSize }),
			totalBytes: faker.number.int({ min: fileSize, max: fileSize * 2 }),
			startTime,
			estimatedEndTime: state === 'in_progress' ? estimatedEndTime : undefined,
			endTime: state === 'complete' ? endTime : undefined,
			canResume: state === 'interrupted' ? faker.datatype.boolean() : false,
			exists: this.query.exists ?? faker.datatype.boolean(),
			incognito: faker.datatype.boolean(),
			paused: state !== 'in_progress' ? false : faker.datatype.boolean(),
		}
	}

	private createMockDownloads(): MockDownloadItem[] {
		return faker.helpers.multiple(
			() => this.createMockDownloadItem(),
			{ count: this.query.limit ?? 10 }
		)
	}

	public getDownloads(): MockDownloadItem[] {
		return this.downloads
	}

	public getItem(): MockDownloadItem {
		return faker.helpers.arrayElement(this.downloads)
	}

	public reset() {
		this.downloads = this.createMockDownloads()
	}
}
