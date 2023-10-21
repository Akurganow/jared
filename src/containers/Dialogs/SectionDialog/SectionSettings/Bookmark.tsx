import { useCallback } from 'react'
import BooleanField from 'containers/Dialogs/SectionDialog/SettingsTypes/Boolean'
import StringField from 'containers/Dialogs/SectionDialog/SettingsTypes/String'
import st from '../styles.module.css'
import type { ChangeEvent } from 'react'
import type { SectionItemBookmarks, SectionSettingsProps } from 'types/sections'

export type SectionSettings = SectionItemBookmarks['settings']
export type SectionSettingKey = keyof SectionSettings
export type SectionSettingValue = SectionSettings[SectionSettingKey]['value']

export default function BookmarkSectionSettings({ item, onChange }: SectionSettingsProps<SectionItemBookmarks>) {
	const { settings } = item

	const createUpdatedItem = useCallback((name: SectionSettingKey, value: SectionSettingValue) => {
		return {
			...item,
			settings: {
				...settings,
				[name]: {
					...item.settings[name],
					value
				}
			}
		}
	}, [item, settings])

	const handleChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		const checked = event.target.checked as SectionSettingValue
		const value = event.target.value as SectionSettingValue
		const name = event.target.name as SectionSettingKey

		if (event.target.type === 'checkbox') {
			onChange(createUpdatedItem(name, checked))
		} else {
			onChange(createUpdatedItem(name, value))
		}
	}, [createUpdatedItem, onChange])

	return <form
		className={st.container}
		onChange={handleChange}
	>
		<BooleanField name="saveToBrowser" setting={settings.saveToBrowser} />
		<StringField name="browserKey" setting={settings.browserKey} />
	</form>
}
