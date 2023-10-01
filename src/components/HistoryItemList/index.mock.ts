import { faker } from '@faker-js/faker'
import type { ITSHistoryItem, ITSProviderType, ITSType, VCSHistoryItem, VCSProviderType, VCSType } from 'types/history'

const vcsTypes: VCSType[] = ['unknown', 'tree', 'blob', 'filter', 'topics', 'mergeRequest', 'pullRequest', 'pipeline', 'job', 'commit']
const itsTypes: ITSType[] = ['unknown', 'issue', 'filter', 'project', 'profile', 'board']
const vcsProviders: VCSProviderType[] = ['gitlab', 'github']
const itsProviders: ITSProviderType[] = ['jira', 'youtrack']

function generateVCSName(): string {
	return `${
		faker.lorem.word({ length: { min: 2, max: 5 } })
	}/${
		faker.lorem.slug({ min: 2, max: 3 })
	}`
}
function generateITSName(): string {
	return `${
		faker.lorem.word({ length: { min: 2, max: 4 } }).toUpperCase()
	}-${
		faker.number.int({ min: 100, max: 10000 })
	}`
}

function generateHistoryItem<T extends (VCSHistoryItem | ITSHistoryItem)>(
	types: T['type'][],
	providers: T['provider'][],
	generators?: Partial<Record<keyof T, () => T[keyof T]>>,
): () => T {
	return () => ({
		id: generators?.id?.() || faker.string.uuid(),
		title: generators?.title?.() || faker.lorem.sentence(),
		url: generators?.url?.() || faker.internet.url(),
		lastVisitTime: generators?.lastVisitTime?.() || faker.date.recent().getTime(),
		visitCount: generators?.visitCount?.() || faker.number.int({ min: 10, max: 1000 }),
		typedCount: generators?.typedCount?.() || faker.number.int({ min: 10, max: 1000 }),
		name: generators?.name?.() || faker.lorem.word(),
		type: generators?.type?.() || faker.helpers.arrayElement(types),
		typeName: generators?.typeName?.() || faker.lorem.word(),
		provider: generators?.provider?.() || faker.helpers.arrayElement(providers),
		pinned: generators?.pinned?.() || faker.datatype.boolean(),
	} as unknown as T)
}

export const vcsMock = faker.helpers.multiple<VCSHistoryItem>(
	generateHistoryItem<VCSHistoryItem>(vcsTypes, vcsProviders, { name: generateVCSName }),
	{ count: { min: 7, max: 10 } },
)

export const itsMock = faker.helpers.multiple<ITSHistoryItem>(
	generateHistoryItem<ITSHistoryItem>(itsTypes, itsProviders, { name: generateITSName }),
	{ count: { min: 7, max: 10 } },
)
