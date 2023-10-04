import { faker } from '@faker-js/faker'
import { pinItem, unpinItem, updateHistory } from 'store/actions/history'
import { initialState } from 'store/constants/history'
import createReducer from 'store/reducers/history'
import { selectedUserContentItems } from 'store/selectors/history'
import { configureMockStore } from 'store/__tests__/mock-store'
import { createStateHistoryItem } from 'src/__mocks__/history'

function createInitial(partialState: Partial<typeof initialState> = {}) {
	const state = Object.assign({}, initialState, partialState)
	const store = configureMockStore({ history: state })

	return {
		reducer: createReducer(state),
		state,
		store,
	}
}

function getIds(items: chrome.history.HistoryItem[]) {
	return items.map(item => item.id)
}

describe('store/history', () => {
	describe('actions', () => {
		test('pinItem', () => {
			const id = faker.string.nanoid()

			expect(pinItem(id)).toEqual({
				type: 'history/pinItem',
				payload: id,
			})
		})

		test('unpinItem', () => {
			const id = faker.string.nanoid()

			expect(unpinItem(id)).toEqual({
				type: 'history/unpinItem',
				payload: id,
			})
		})

		test('updateHistory', async () => {
			const store = configureMockStore()

			await store.dispatch(updateHistory())

			expect(chrome.history.search).toHaveBeenCalledTimes(7)
		})
	})

	describe('reducer', () => {
		test('should return the initial state', () => {
			const { reducer, state } = createInitial()

			expect(reducer(state, { type: '' })).toEqual(initialState)
		})

		test('pinItem', () => {
			const { reducer, state } = createInitial()
			const historyItem = createStateHistoryItem('google')

			state.main.push(historyItem)

			const passedReducer = reducer(state, pinItem(historyItem.id))

			expect(getIds(passedReducer.main)).not.toContain(historyItem.id)
			expect(getIds(passedReducer.pinned.main)).toContain(historyItem.id)
		})

		test('unpinItem', () => {
			const { reducer, state } = createInitial()
			const historyItem = createStateHistoryItem('google', true)

			state.pinned.main.push(historyItem)

			const passedReducer = reducer(state, unpinItem(historyItem.id))

			expect(getIds(passedReducer.main)).toContain(historyItem.id)
			expect(getIds(passedReducer.pinned.main)).not.toContain(historyItem.id)
		})
	})

	describe('selectors', () => {
		test('getHistory', () => {
			const historyItem = createStateHistoryItem('google')
			const { store: { getState } } = createInitial({
				main: [historyItem],
			})

			const selected = selectedUserContentItems(getState())

			expect(selected).toEqual([historyItem])
		})
	})
})
