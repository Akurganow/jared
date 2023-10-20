import { useCallback } from 'react'
import BooleanField from 'containers/Dialogs/SectionDialog/SettingsTypes/Boolean'
// import { useDispatch } from 'react-redux'
import st from '../styles.module.css'
import type { SectionItemBookmarks, SectionSettingsProps } from 'types/sections'
import type { ChangeEvent } from 'react'

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
		const value = event.target.checked as SectionSettingValue
		const name = event.target.name as SectionSettingKey
		const newItem = createUpdatedItem(name, value)

		onChange(newItem)
	}, [])

	return (
		<form
			className={st.container}
			onChange={handleChange}
		>
			<BooleanField name="saveToBrowser" setting={settings.saveToBrowser} />
		</form>
	)
}
