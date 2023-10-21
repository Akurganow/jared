import { ITSHistoryItem, ITSProviderType, ProcessorConfigType, VCSHistoryItem, VCSProviderType } from 'types/history'

interface SectionSettingsTypeBase {
	hint?: string
}
export interface SectionSettingsTypeNumber extends SectionSettingsTypeBase {
	type: 'number'
	value: number
	max?: number
	min?: number
	step?: number
}
export interface SectionSettingsTypeString extends SectionSettingsTypeBase {
	type: 'string'
	value: string
	pattern?: RegExp
}
export interface SectionSettingsTypeBoolean extends SectionSettingsTypeBase {
	type: 'boolean'
	value: boolean
}
export interface SectionSettingsTypeOption extends SectionSettingsTypeBase {
	type: 'option'
	value: string
	options: string[]
}

export interface SectionSettingsTypeText extends SectionSettingsTypeBase {
	type: 'text'
	value: string
	pattern?: RegExp
}
export interface SectionSettingsTypeArray<T extends Array<string>> extends SectionSettingsTypeBase {
	type: 'array'
	value: T
}
export interface SectionSettingsDisabled {
	type: 'disabled'
	value: ProcessorConfigType['name'][]
}

export type SectionSettingsType<T> = T extends string[]
	? SectionSettingsTypeOption
	: T extends number
		? SectionSettingsTypeNumber
		: T extends string
			? SectionSettingsTypeString
			: T extends boolean
				? SectionSettingsTypeBoolean
				: never

interface SectionSettingsBase {}
export interface ContainerSectionSettings extends SectionSettingsBase{
	direction: SectionSettingsType<('row' | 'column')[]>
}
export interface HistorySectionSettingsBase extends SectionSettingsBase {
	maxResults: SectionSettingsType<number>
	numDays: SectionSettingsType<number>
	query: SectionSettingsTypeText
	exclude: SectionSettingsTypeText
}
export type VCSSectionSettings = HistorySectionSettingsBase & {
	[k in VCSProviderType]: SectionSettingsDisabled
}
export type ITSSectionSettings = HistorySectionSettingsBase & {
	[k in ITSProviderType]: SectionSettingsDisabled
}
export interface HistorySectionSettings extends HistorySectionSettingsBase {}
export interface BookmarksSectionSettings extends SectionSettingsBase {
	saveToBrowser: SectionSettingsType<boolean>
	browserKey: SectionSettingsType<string>
	browserId: SectionSettingsType<string>
}

export interface SectionItemBase {
	id: string
}

export interface SectionItemContainer extends SectionItemBase {
	type: 'container'
	settings: ContainerSectionSettings
	items: SectionItem['id'][]
}
export interface SectionItemVCS extends SectionItemBase {
	type: 'vcs'
	settings: VCSSectionSettings
	items: VCSHistoryItem[]
	pinned: VCSHistoryItem[]
}
export interface SectionItemITS extends SectionItemBase {
	type: 'its'
	settings: ITSSectionSettings
	items: ITSHistoryItem[]
	pinned: ITSHistoryItem[]
}
export interface SectionItemHistory extends SectionItemBase {
	type: 'history'
	settings: HistorySectionSettings
	items: chrome.history.HistoryItem[]
	pinned: chrome.history.HistoryItem[]
}
export interface SectionItemBookmarks extends SectionItemBase {
	type: 'bookmarks'
	settings: BookmarksSectionSettings
	items: chrome.bookmarks.BookmarkTreeNode[]
	editingItem?: chrome.bookmarks.BookmarkTreeNode | null
}

export type SectionItem = SectionItemContainer | SectionItemVCS | SectionItemITS | SectionItemHistory | SectionItemBookmarks

export interface SectionsState {
	editingItem: SectionItem | null
	editMode: boolean
	providers: {
		vcs: VCSProviderType[]
		its: ITSProviderType[]
	}
	items: SectionItem[]
}

export interface SectionSettingsFieldPropsBase<T extends number | string | boolean | string[]> {
	setting: SectionSettingsType<T>
	name: string
}
export interface SectionSettingsFieldPropsBoolean extends SectionSettingsFieldPropsBase<boolean> {}
export interface SectionSettingsFieldPropsOption extends SectionSettingsFieldPropsBase<string[]> {}
export interface SectionSettingsFieldPropsNumber extends SectionSettingsFieldPropsBase<number> {}
export interface SectionSettingsFieldPropsString extends SectionSettingsFieldPropsBase<string> {}

export type SettingsFieldProps =
	SectionSettingsFieldPropsBoolean
	| SectionSettingsFieldPropsOption
	| SectionSettingsFieldPropsNumber
	| SectionSettingsFieldPropsString

export interface SectionSettingsFieldPropsText {
	name: string
	setting: SectionSettingsTypeText
}

export interface SectionSettingsFieldDisabledProps {
	name: VCSProviderType | ITSProviderType
	setting: SectionSettingsDisabled
}

export interface SectionSettingsProps<T> {
	item: T
	onChange: (item: T) => void
}
