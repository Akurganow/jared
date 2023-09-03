import { rootReducer } from 'store/reducers' // eslint-disable-line import/no-cycle

export type RootState = ReturnType<typeof rootReducer>
