import { actionCreatorFactory } from 'typescript-fsa'
import { REHYDRATE } from 'redux-persist'

const createRehydrateAction = actionCreatorFactory()
export const rehydratePersistStore = createRehydrateAction<void>(REHYDRATE)
