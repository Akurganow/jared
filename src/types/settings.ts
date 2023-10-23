export type SettingsTypeCommon = {
	name: string
	hint: string
}
export type SettingTypeString = {
	type: 'string'
	value: string
	pattern?: RegExp
} & SettingsTypeCommon
export type SettingTypeNumber = {
	type: 'number'
	value: number
	max?: number
	min?: number
	step?: number
} & SettingsTypeCommon
export type SettingTypeBoolean = {
	type: 'boolean'
	value: boolean
} & SettingsTypeCommon
export type SettingTypeOption = {
	type: 'option'
	value: string
	options: string[]
} & SettingsTypeCommon

export interface SettingsState {
	theme: SettingTypeOption
}
