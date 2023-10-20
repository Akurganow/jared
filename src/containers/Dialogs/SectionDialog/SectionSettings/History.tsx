import { useCallback } from 'react'
import st from 'containers/Dialogs/SectionDialog/styles.module.css'
import NumberField from 'containers/Dialogs/SectionDialog/SettingsTypes/Number'
import TextField from 'containers/Dialogs/SectionDialog/SettingsTypes/Text'
import type { ChangeEvent } from 'react'
import type { SectionItemHistory, SectionSettingsProps } from 'types/sections'

export type SectionSettings = SectionItemHistory['settings']
export type SectionSettingKey = keyof SectionSettings
export type SectionSettingValue = SectionSettings[SectionSettingKey]['value']

export default function HistorySectionSettings({ item, onChange }: SectionSettingsProps<SectionItemHistory>) {
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
		const value = event.target.value as SectionSettingValue
		const checked = event.target.checked as SectionSettingValue
		const name = event.target.name as SectionSettingKey

		if (event.target.type === 'checkbox') {
			onChange(createUpdatedItem(name, checked))
		} else if (event.target.type === 'number') {
			onChange(createUpdatedItem(name, parseInt(value as string)))
		} else {
			onChange(createUpdatedItem(name, value))
		}
	}, [createUpdatedItem, onChange])

	return (
		<form
			className={st.container}
			onChange={handleChange}
		>
			<NumberField name="maxResults" setting={settings.maxResults} />
			<NumberField name="numDays" setting={settings.numDays} />
			<TextField name="query" setting={settings.query} />
			<TextField name="exclude" setting={settings.exclude} />
		</form>
	)
}
