import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {
	pinItem, unpinItem,
	updateITSHistory, updateITSPinnedHistory,
	updateUserHistory, updateUserPinnedHistory,
	updateVCSHistory, updateVCSPinnedHistory
} from 'store/actions/history'
import { movePinnedItemBetweenArrays } from 'utils/history/helpers'
import type { HistoryState } from 'types/history'

const createReducer = (initialState: HistoryState) => reducerWithInitialState(initialState)
	.case(updateUserHistory, (state, items) => ({
		...state,
		main: items,
	}))
	.case(updateVCSHistory, (state, items) => ({
		...state,
		vcs: items,
	}))
	.case(updateUserPinnedHistory, (state, items) => {
		const pinned = state.pinned.main
			.map(pinned => {
				const updated = items.find(item => item.id === pinned.id)

				if (updated) {
					return {
						...pinned,
						...updated,
					}
				}

				return pinned
			})

		return {
			...state,
			pinned: {
				...state.pinned,
				main: pinned,
			}
		}
	})
	.case(updateVCSPinnedHistory, (state, items) => {
		const vcsPinned = state.pinned.vcs
			.map(pinned => {
				const updated = items.find(item => item.id === pinned.id)

				if (updated) {
					return {
						...pinned,
						...updated,
					}
				}

				return pinned
			})

		return {
			...state,
			pinned: {
				...state.pinned,
				vcs: vcsPinned,
			}
		}
	})
	.case(updateITSPinnedHistory, (state, items) => {
		const itsPinned = state.pinned.its
			.map(pinned => {
				const updated = items.find(item => item.id === pinned.id)

				if (updated) {
					return {
						...pinned,
						...updated,
					}
				}

				return pinned
			})

		return {
			...state,
			pinned: {
				...state.pinned,
				its: itsPinned,
			}
		}
	})
	.case(updateITSHistory, (state, items) => ({
		...state,
		its: items,
	}))
	.case(pinItem, (state, id) => {
		const isVCS = [...state.vcs, ...state.pinned.vcs]
			.find(item => item.id === id)
		const isITS = [...state.its, ...state.pinned.its]
			.find(item => item.id === id)

		switch (true) {
		case Boolean(isVCS): {
			const [vcs, vcsPinned] = movePinnedItemBetweenArrays(state.vcs, state.pinned.vcs, id)
			return {
				...state,
				vcs,
				pinned: {
					...state.pinned,
					vcs: vcsPinned,
				}
			}
		}
		case Boolean(isITS): {
			const [its, itsPinned] = movePinnedItemBetweenArrays(state.its, state.pinned.its, id)
			return {
				...state,
				its,
				pinned: {
					...state.pinned,
					its: itsPinned,
				}
			}
		}
		default: {
			const [main, mainPinned] = movePinnedItemBetweenArrays(state.main, state.pinned.main, id)
			return {
				...state,
				main,
				pinned: {
					...state.pinned,
					main: mainPinned,
				}
			}
		}
		}
	})
	.case(unpinItem, (state, id) => {
		const [mainPinned, main] = movePinnedItemBetweenArrays(state.pinned.main, state.main, id)
		const [vcsPinned, vcs] = movePinnedItemBetweenArrays(state.pinned.vcs, state.vcs, id)
		const [itsPinned, its] = movePinnedItemBetweenArrays(state.pinned.its, state.its, id)

		return {
			...state,
			pinned: {
				main: mainPinned,
				vcs: vcsPinned,
				its: itsPinned,
			},
			main,
			vcs,
			its,
		}
	})

export default createReducer
