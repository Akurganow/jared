import { actionCreatorFactory } from 'typescript-fsa'
import { storeKey } from 'store/reducers/dialogs'

const createAction = actionCreatorFactory(storeKey)
export const openDialog = createAction<string>('openDialog')
export const closeDialog = createAction<string>('closeDialog')
export const switchDialog = createAction<string>('switchDialog')

console.log('actions/dialogs', openDialog, closeDialog, switchDialog)
