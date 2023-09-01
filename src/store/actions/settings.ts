import { actionCreatorFactory } from 'typescript-fsa'
import { SettingsState } from 'store/types/settings'
import { storeKey } from 'store/reducers/settings'

const createAction = actionCreatorFactory(storeKey)
export const setSetting =
	createAction<{ key: keyof SettingsState, value: SettingsState[keyof SettingsState]['value'] }>('setSetting')
export const setSettings =
	createAction<Partial<SettingsState>>('setSettings')
