import { AnyAction, Store } from 'redux'
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/remote'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { rootReducer, initialState } from 'store/reducers'
import { RootState } from 'store/types'
import { updateHistory } from 'store/actions/history'

const thunk: ThunkMiddleware<RootState, AnyAction> = thunkMiddleware
const store = configureStore({
	reducer: rootReducer,
	preloadedState: initialState,
	middleware: [thunk],
	enhancers: [
		devToolsEnhancer({
			name: 'Jared',
			realtime: true,
			hostname: 'localhost',
			port: 1024,
		}),
	],
})
const persistor = persistStore(store as unknown as Store)

async function updateStore(store: Store) {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = store.dispatch
	await dispatch(updateHistory())
}

updateStore(store)

export { store, persistor }
export { PersistPartial } from 'store/types'
