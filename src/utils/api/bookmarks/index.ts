import type { BookmarkCreateArg, BookmarkSearchQuery, Browser } from '../types'

export default class Bookmarks {
	// ленивое разрешение: даёт окружениям без реального Chrome (Storybook, jsdom)
	// установить мок window.chrome до первого обращения к API
	private get browser(): Browser {
		return (window.browser ?? window.chrome) as unknown as Browser
	}

	public async getTree() {
		return await this.browser.bookmarks.getTree()
	}

	public async getSubTree(id: string) {
		return await this.browser.bookmarks.getSubTree(id)
	}

	public async get(id: string) {
		return await this.browser.bookmarks.get(id)
	}

	public async search(query: BookmarkSearchQuery) {
		return await this.browser.bookmarks.search(query)
	}

	public async create(bookmark: BookmarkCreateArg) {
		return await this.browser.bookmarks.create(bookmark)
	}

	public async update(id: string, changes: { title?: string; url?: string }) {
		return await this.browser.bookmarks.update(id, changes)
	}

	public async remove(id: string) {
		return await this.browser.bookmarks.remove(id)
	}

	public async removeTree(id: string) {
		return await this.browser.bookmarks.removeTree(id)
	}

	public async move(id: string, destination: { parentId?: string; index?: number }) {
		return await this.browser.bookmarks.move(id, destination)
	}
}
