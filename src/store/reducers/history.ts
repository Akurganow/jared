import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { movePinnedItemBetweenArrays } from 'store/helpers/history'
// eslint-disable-next-line import/no-cycle
import { pinItem, unpinItem, updateITSHistory, updateUserHistory, updateVCSHistory } from 'store/actions/history'
import { initialState } from 'store/constants/history'

const reducer = reducerWithInitialState(initialState)
	.case(updateUserHistory, (state, items) => ({
		...state,
		main: items,
	}))
	.case(updateVCSHistory, (state, items) => ({
		...state,
		vcs: items,
	}))
	.case(updateITSHistory, (state, items) => ({
		...state,
		its: items,
	}))
	.case(pinItem, (state, id) => {
		const [main, mainPinned] = movePinnedItemBetweenArrays(state.main, state.pinned.main, id, true)
		const [vcs, vcsPinned] = movePinnedItemBetweenArrays(state.vcs, state.pinned.vcs, id, true)
		const [its, itsPinned] = movePinnedItemBetweenArrays(state.its, state.pinned.its, id, true)

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
	.case(unpinItem, (state, id) => {
		const [mainPinned, main] = movePinnedItemBetweenArrays(state.pinned.main, state.main, id, false)
		const [vcsPinned, vcs] = movePinnedItemBetweenArrays(state.pinned.vcs, state.vcs, id, false)
		const [itsPinned, its] = movePinnedItemBetweenArrays(state.pinned.its, state.its, id, false)

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

export default reducer
