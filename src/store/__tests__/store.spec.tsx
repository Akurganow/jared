import { closeDialog, openDialog } from 'store/actions/dialogs'
import { switchEditMode } from 'store/actions/sections'
import { createDialogSelector } from 'store/selectors/dialogs'
import { selectedEditMode } from 'store/selectors/sections'
import type { RootState } from 'store/types'
import { configureMockStore } from './mock-store'

// Интеграционные тесты стора: боевые редьюсеры + экшены + селекторы,
// без браузера и без persist
describe('store integration', () => {
	test('открытие и закрытие диалога отражается в селекторе', () => {
		const store = configureMockStore()

		expect(createDialogSelector(store.getState() as RootState, 'settings')).toBe(false)

		store.dispatch(openDialog('settings'))
		expect(createDialogSelector(store.getState() as RootState, 'settings')).toBe(true)

		store.dispatch(closeDialog('settings'))
		expect(createDialogSelector(store.getState() as RootState, 'settings')).toBe(false)
	})

	test('переключение режима редактирования секций', () => {
		const store = configureMockStore()

		expect(selectedEditMode(store.getState() as RootState)).toBe(false)

		store.dispatch(switchEditMode(true))
		expect(selectedEditMode(store.getState() as RootState)).toBe(true)
	})
})
