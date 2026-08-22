// Мок chrome.* API для Storybook и других окружений без реального Chrome.
// Данные истории генерируются @plq/faker — теми же шаблонами, что и в Jest-моках,
// поэтому VCS/ITS/History-секции наполняются правдоподобными записями.
import { History as MockHistory } from '@plq/faker'

type Listener = (...args: never[]) => void

function createEvent() {
	const listeners = new Set<Listener>()

	return {
		addListener: (fn: Listener) => listeners.add(fn),
		removeListener: (fn: Listener) => listeners.delete(fn),
		hasListener: (fn: Listener) => listeners.has(fn),
		hasListeners: () => listeners.size > 0,
	}
}

function createStorageArea() {
	let data: Record<string, unknown> = {}

	return {
		get(keys: string | string[] | null, callback?: (items: Record<string, unknown>) => void) {
			const result: Record<string, unknown> = {}
			const list = keys === null || keys === undefined ? Object.keys(data) : ([] as string[]).concat(keys)

			for (const key of list) {
				if (key in data) result[key] = data[key]
			}

			callback?.(result)

			return Promise.resolve(result)
		},
		set(items: Record<string, unknown>, callback?: () => void) {
			Object.assign(data, items)
			callback?.()

			return Promise.resolve()
		},
		remove(keys: string | string[], callback?: () => void) {
			for (const key of ([] as string[]).concat(keys)) delete data[key]
			callback?.()

			return Promise.resolve()
		},
		clear(callback?: () => void) {
			data = {}
			callback?.()

			return Promise.resolve()
		},
	}
}

type BookmarkNode = {
	id: string
	parentId?: string
	title: string
	url?: string
	syncing: boolean
	dateAdded: number
}

function createBookmarksMock() {
	const nodes = new Map<string, BookmarkNode>()
	let nextId = 1

	const rootId = '0'
	nodes.set(rootId, { id: rootId, title: '', syncing: false, dateAdded: 0 })
	const barId = '1'
	nodes.set(barId, { id: barId, parentId: rootId, title: 'Bookmarks bar', syncing: false, dateAdded: 0 })
	nextId = 2

	const childrenOf = (id: string): BookmarkNode[] =>
		[...nodes.values()].filter((node) => node.parentId === id).map((node) => withChildren(node))

	const withChildren = (node: BookmarkNode): BookmarkNode & { children?: BookmarkNode[] } =>
		node.url ? { ...node } : { ...node, children: childrenOf(node.id) }

	const require = (id: string): BookmarkNode => {
		const node = nodes.get(id)

		if (!node) throw new Error(`Bookmark node not found: ${id}`)

		return node
	}

	return {
		async getTree() {
			return [withChildren(require(rootId))]
		},
		async getSubTree(id: string) {
			return [withChildren(require(id))]
		},
		async get(id: string) {
			return [{ ...require(id) }]
		},
		async search(query: { url?: string; title?: string; query?: string } | string) {
			const q = typeof query === 'string' ? { query } : query

			return [...nodes.values()]
				.filter((node) => {
					if (q.url) return node.url === q.url
					if (q.title) return node.title === q.title
					if (q.query) return node.title.includes(q.query) || (node.url ?? '').includes(q.query)

					return false
				})
				.map((node) => ({ ...node }))
		},
		async create(details: { parentId?: string; title?: string; url?: string; index?: number }) {
			const node: BookmarkNode = {
				id: String(nextId++),
				parentId: details.parentId ?? barId,
				title: details.title ?? '',
				url: details.url,
				syncing: false,
				dateAdded: 1700000000000 + nextId,
			}
			nodes.set(node.id, node)

			return withChildren(node)
		},
		async update(id: string, changes: { title?: string; url?: string }) {
			const node = require(id)
			Object.assign(node, changes)

			return { ...node }
		},
		async move(id: string, destination: { parentId?: string; index?: number }) {
			const node = require(id)

			if (destination.parentId) node.parentId = destination.parentId

			return { ...node }
		},
		async remove(id: string) {
			nodes.delete(id)
		},
		async removeTree(id: string) {
			for (const child of childrenOf(id)) nodes.delete(child.id)
			nodes.delete(id)
		},
		onCreated: createEvent(),
		onChanged: createEvent(),
		onRemoved: createEvent(),
		onMoved: createEvent(),
	}
}

function createHistoryMock() {
	return {
		async search(query: chrome.history.HistoryQuery) {
			return new MockHistory(query).createMockItems()
		},
		getVisits: async () => [],
		addUrl: async () => {},
		deleteUrl: async () => {},
		deleteRange: async () => {},
		deleteAll: async () => {},
		onVisited: createEvent(),
		onVisitRemoved: createEvent(),
	}
}

export function createChromeMock() {
	return {
		history: createHistoryMock(),
		bookmarks: createBookmarksMock(),
		storage: {
			local: createStorageArea(),
			sync: createStorageArea(),
			session: createStorageArea(),
			onChanged: createEvent(),
		},
		runtime: {
			id: 'storybook-mock-extension',
			// Favicon строит URL через chrome.runtime.getURL('/_favicon/') и добавляет
			// query-параметры; статика Storybook отдаёт favicon-mock.svg, игнорируя query
			getURL: () => new URL('/favicon-mock.svg', window.location.origin).toString(),
			onMessage: createEvent(),
			sendMessage: async () => {},
		},
	}
}

export function installChromeMock() {
	const mock = createChromeMock() as unknown as typeof chrome

	Object.assign(window, { chrome: mock })

	return mock
}
