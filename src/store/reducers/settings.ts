import { reducerWithInitialState } from 'typescript-fsa-reducers'
import merge from 'lodash/merge'
import { setProcessing, setSetting, setSettings, setThemeOptions } from 'store/actions/settings'
import type { SettingsState } from 'types/settings'
// import { getThemesNames } from 'utils/themes'
// import { rehydratePersistStore } from 'store/actions/persist-store'

const createReducer = (initialState: SettingsState) => reducerWithInitialState(initialState)
	.case(setSetting, (state, { key, value }) => ({
		...state,
		[key]: {
			...state[key],
			value,
		},
	}))
	.case(setSettings, (state, settings) =>
		merge({}, state, settings)
	)
	.case(setProcessing, (state, processing) => ({
		...state,
		processing: {
			...state.processing,
			...processing,
		}
	}))
	.case(setThemeOptions, (state, options) => ({
		...state,
		theme: {
			...state.theme,
			options,
		}
	}))
	// .case(rehydratePersistStore, state => ({
	// 	...state,
	// 	theme: {
	// 		...state.theme,
	// 		options: getThemesNames(),
	// 	}
	// }))

export default createReducer
