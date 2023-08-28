import { useSelector } from 'react-redux'
import { selectedSetting, SettingTypeNumber } from 'store/settings'
import st from '../styles.module.css'
import { SettingsFieldProps } from './types'


export default function ({ setting }: SettingsFieldProps) {
	const { value, name, max, min } =
			useSelector(selectedSetting(setting)) as SettingTypeNumber

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input name={setting} defaultValue={value} max={max} min={min} />
			</div>
		</>
	)
}
