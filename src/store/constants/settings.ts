import type { SettingsState } from 'types/settings'
import { getThemesNames } from 'utils/themes'

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
