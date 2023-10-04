/* eslint-disable @typescript-eslint/ban-ts-comment, import/default,import/no-extraneous-dependencies */
// @ts-ignore
import chrome from 'jest-webextension-mock'
import { faker } from '@faker-js/faker'
import { createHistoryItem } from 'src/__mocks__/history'

const createEvent = () => ({
	addListener: jest.fn(),
	removeListener: jest.fn(),
	hasListener: jest.fn(),
	hasListeners: jest.fn(),
})

// https://developer.chrome.com/docs/extensions/reference/history/
const history = {
	// @ts-ignore
	search: async (query: chrome.history.HistoryQuery) => faker.helpers.multiple(
		() => createHistoryItem(query.text),
		{ count: (query.maxResults || 10) / 10 }
	),
	getVisits: jest.fn(),
	addUrl: jest.fn(),
	deleteUrl: jest.fn(),
	deleteRange: jest.fn(),
	deleteAll: jest.fn(),
	onVisited: createEvent() as unknown as chrome.events.Event<(result: chrome.history.HistoryItem) => void>,
	onVisitRemoved: createEvent() as unknown as chrome.events.Event<(removed: chrome.history.RemovedResult) => void>,
}

jest.spyOn(history, 'search')

global.chrome.history = history

export default chrome
