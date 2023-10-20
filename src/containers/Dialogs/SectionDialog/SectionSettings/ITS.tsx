import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import st from 'containers/Dialogs/SectionDialog/styles.module.css'
import DisabledSectionSettings from 'containers/Dialogs/SectionDialog/SettingsTypes/Disabled'
import NumberField from 'containers/Dialogs/SectionDialog/SettingsTypes/Number'
import TextField from 'containers/Dialogs/SectionDialog/SettingsTypes/Text'
import { selectedITSProviders } from 'store/selectors/sections'
import type { SectionItemITS, SectionSettingsProps } from 'types/sections'
import type { ChangeEvent } from 'react'

export type SectionSettings = SectionItemITS['settings']
export type SectionSettingKey = keyof SectionSettings
export type SectionSettingValue = SectionSettings[SectionSettingKey]['value']

export default function ITSSectionSettings({ item, onChange }: SectionSettingsProps<SectionItemITS>) {
	const providers = useSelector(selectedITSProviders)
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
		} else if (event.target.multiple) {
			const options = event.target.options
			const selectedOptions = []
			for (let i = 0; i < options.length; i++) {
				if (options[i].selected) {
					selectedOptions.push(options[i].value)
				}
			}
			onChange(createUpdatedItem(name, selectedOptions))
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
			<div className={cn(st.item, st.subTitle)}>
				<div className={st.name}>Request settings:</div>
			</div>
			<NumberField name="maxResults" setting={settings.maxResults} />
			<NumberField name="numDays" setting={settings.numDays} />
			<TextField name="query" setting={settings.query} />
			<TextField name="exclude" setting={settings.exclude} />
			<div className={cn(st.item, st.subTitle)}>
				<div className={st.name}>Disabled types:</div>
			</div>
			{providers.map(provider =>
				<DisabledSectionSettings
					key={provider}
					name={provider}
					setting={settings[provider]}
				/>
			)}
		</form>
	)
}
