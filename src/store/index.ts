import { AnyAction, Store } from 'redux'
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/remote'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { updateHistory } from 'store/history'
import { RootState } from 'store/types'
import { rootReducer, initialState } from './reducers'
// import db from 'libs/idb'
// import initializeBackup from 'libs/backup'
// import { cacheUrl } from 'libs/convert'
//
// import { setFaviconCache } from 'store/favicons'
// import { setFavicon, TaskId } from 'store/tasks'
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

// export function updateTasksIcons({ url, favicon, taskId }: { url?: string; taskId?: TaskId; favicon: string; }) {
//     if (taskId) {
//         store.dispatch(setFavicon({ favicon, taskId }))
//     }
//
//     if (url) {
//         const state = store.getState()
//         const tasks = state.tasks.tasks.filter(task => task.url && cacheUrl(task.url) === cacheUrl(url))
//
//         tasks.forEach(task => {
//             store.dispatch(setFavicon({ taskId: task.id, favicon }))
//         })
//
//         store.dispatch(setFaviconCache({ favicon, url }))
//     }
// }
//
// initializeBackup(store)

// async function rehydrateStoreChange(change: IDatabaseChange) {
//     if (change.table === 'persist') {
//         const config = persistConfigs[change.key.replace('persist:jared/', '')]
//         const state = await getStoredState(config)
//
//         store.dispatch({
//             type: REHYDRATE,
//             key: config.key,
//             payload: state,
//         })
//     }
// }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// db.on('changes', (changes: IDatabaseChange[]) => {
//     changes.forEach(rehydrateStoreChange)
// })

export { store, persistor }
