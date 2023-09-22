import { useSelector } from 'react-redux'
import { selectedSetting } from 'store/selectors/settings'
import st from '../styles.module.css'
import type { SettingTypeOption } from 'types/settings'
import type { SettingsFieldProps } from './types'

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
