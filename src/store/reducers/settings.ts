import { reducerWithInitialState } from 'typescript-fsa-reducers'
import merge from 'lodash/merge'
import { setSetting, setSettings, setThemeOptions } from 'store/actions/settings'
import { initialState } from 'store/constants/settings'
// import { getThemesNames } from 'utils/themes'
// import { rehydratePersistStore } from 'store/actions/persist-store'

const reducer = reducerWithInitialState(initialState)
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

export default reducer
