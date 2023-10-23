import { getThemesNames } from 'utils/themes'
import type { SettingsState } from 'types/settings'

export const storeKey = 'settings'
export const initialState: SettingsState = {
	theme: {
		value: 'System',
		options: getThemesNames(),
		type: 'option',
		name: 'Theme',
		hint: 'Select a theme',
	},
}

