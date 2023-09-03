import { reducerWithInitialState } from 'typescript-fsa-reducers'
import merge from 'lodash/merge'
import { setSetting, setSettings } from 'store/actions/settings'
import { initialState } from 'store/constants/settings'

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

export default reducer
