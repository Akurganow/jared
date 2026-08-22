import { configureStore } from '@reduxjs/toolkit'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { preloadedState, reducer } from 'src/store'
import { spyOn } from 'storybook/test'

type MockState = Partial<typeof preloadedState>

// Стор с боевыми редьюсерами, но без persistStore/PersistGate —
// состояние живёт в памяти, dispatch обёрнут шпионом для assert'ов в play-тестах
export function createMockStore(state: MockState = {}) {
	const store = configureStore({
		reducer,
		preloadedState: { ...preloadedState, ...state },
	})

	spyOn(store, 'dispatch')

	return store
}

export const store = createMockStore()

export const Mockstore = ({ children, state }: { children: ReactNode; state?: MockState }) => (
	<Provider store={state ? createMockStore(state) : store}>{children}</Provider>
)
