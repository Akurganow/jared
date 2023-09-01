import { createSelector } from 'reselect'
import { RootState } from 'store/types'
import { DialogsState } from 'store/types/dialogs'
import { storeKey } from 'store/constants/dialogs'

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
