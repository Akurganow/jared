export type SettingsTypes = 'number' | 'string' | 'boolean' | 'option'
export type SettingTypeString = {
	type: 'string'
	name: string
	value: string
	pattern?: RegExp
}
export type SettingTypeNumber = {
	type: 'number'
	name: string
	value: number
	max?: number
	min?: number
	step?: number
}
export type SettingTypeBoolean = {
	type: 'boolean'
	name: string
	value: boolean
}
export type SettingTypeOption = {
	type: 'option'
	name: string
	value: string
	options: string[]
}

export interface SettingsState {
	maxResults: SettingTypeNumber
	numDays: SettingTypeNumber
	userQuery: SettingTypeString
	vcsQuery: SettingTypeString
	itsQuery: SettingTypeString
	theme: SettingTypeOption
}
