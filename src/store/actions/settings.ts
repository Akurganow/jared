import { actionCreatorFactory } from 'typescript-fsa'
import { storeKey } from 'store/constants/settings'
import type { SettingsState } from 'types/settings'

const createAction = actionCreatorFactory(storeKey)
export const setSetting =
	createAction<{ key: keyof SettingsState, value: SettingsState[keyof SettingsState]['value'] }>('setSetting')
export const setSettings =
	createAction<Partial<SettingsState>>('setSettings')

export const setThemeOptions = createAction<SettingsState['theme']['options']>('setThemeOptions')

type ProcessingProvider = keyof SettingsState['processing']['providers']
type ProcessingOption = SettingsState['processing']['providers'][ProcessingProvider]['disabled'][number]
export const setProcessingOptions =
	createAction<{
		provider: ProcessingProvider
		option: ProcessingOption
		disabled: boolean
	}>('setProcessingOptions')
