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
	enhancers: !thunk && process.env.NODE_ENV === 'development' ? [
		devToolsEnhancer({
			name: 'Jared',
			realtime: true,
			hostname: 'localhost',
			port: 1024,
		}),
	] : undefined,
})
const persistor = persistStore(store as unknown as Store)

persistor.subscribe(async () => {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = store.dispatch
	const { settings } = store.getState()

	if (settings._persist.rehydrated) {
		await dispatch(updateHistory())
	}
})

export { store, persistor }
