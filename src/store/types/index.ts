import { rootReducer } from 'store/reducers'

export interface PersistPartial {
	_persist: { version: number; rehydrated: boolean };
}

export type RootState = ReturnType<typeof rootReducer>
