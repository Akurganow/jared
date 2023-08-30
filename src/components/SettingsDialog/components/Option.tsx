import { useSelector } from 'react-redux'
import { selectedSetting, SettingTypeOption } from 'store/settings'
import st from '../styles.module.css'
import { SettingsFieldProps } from './types'

export default function ({ setting }: SettingsFieldProps) {
	const {
		value,
		name,
		options
	} = useSelector(selectedSetting(setting)) as SettingTypeOption

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<select name={setting} defaultValue={value}>
					{options.map(option =>
						<option key={option} value={option}>
							{option}
						</option>)
					}
				</select>
			</div>
		</>
	)
}