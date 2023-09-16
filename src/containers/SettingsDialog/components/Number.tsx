import { useSelector } from 'react-redux'
import { selectedSetting } from 'store/selectors/settings'
import { SettingTypeNumber } from 'src/types/settings'
import st from '../styles.module.css'
import { SettingsFieldProps } from './types'


export default function ({ setting }: SettingsFieldProps) {
	const {
		value,
		name,
		max,
		min,
		step,
	} =
			useSelector(selectedSetting(setting)) as SettingTypeNumber

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input name={setting} defaultValue={value} type="number" max={max} min={min} step={step} />
			</div>
		</>
	)
}
