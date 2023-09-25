import type { ITSProviderType, ProcessorConfigType, VCSProviderType } from 'types/history'

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
	maxResults: SettingTypeNumber
	numDays: SettingTypeNumber
	userQuery: SettingTypeString
	vcsQuery: SettingTypeString
	itsQuery: SettingTypeString
	theme: SettingTypeOption
	processing: {
		type: 'custom',
		name: 'Processing',
		value: '',
		providers: {
			[key in VCSProviderType | ITSProviderType]: {
				disabled: ProcessorConfigType['name'][]
			}
		},
	}
}
