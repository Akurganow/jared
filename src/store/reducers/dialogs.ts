import { actionCreatorFactory } from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { createSelector } from 'reselect'
import { RootState } from 'store/types'

export interface DialogsState {
	[key: string]: boolean;
}

export const storeKey = 'components'

export const initialState: DialogsState = {
}

// Actions
const createAction= actionCreatorFactory(storeKey)

export const openDialog = createAction<string>('openDialog')
export const closeDialog = createAction<string>('closeDialog')

export const switchDialog = createAction<string>('switchDialog')
// Reducer
export const reducer = reducerWithInitialState(initialState)
	.case(openDialog, (state, key) => {
		const keys = Object.keys(state)
		const newState = { ...state }

		for (const k of keys) {
			newState[k] = false
		}

		newState[key] = true

		return newState
	})
	.case(closeDialog, (state, key) => ({
		...state,
		[key]: false,
	}))
	.case(switchDialog, (state, key) => {
		const current = state[key]
		const keys = Object.keys(state)
		const newState = { ...state }

		if (current) {
			for (const k of keys) {
				newState[k] = false
			}
		} else {
			for (const k of keys) {
				newState[k] = false
			}
			newState[key] = true
		}

		return newState
	})

// Selectors
const rawSelectedDialogs = (state: RootState) => state[storeKey]

export const selectedDialogs = createSelector(
	rawSelectedDialogs,
	(dialogs) => dialogs
)

export const createDialogSelector = createSelector(
	[
		selectedDialogs,
		(_state, key) => key,
	],
	(dialogs, key) => dialogs[key] || false
)

export const selectedDialog = (name: string) =>
	(state: DialogsState) => createDialogSelector(state, name)
