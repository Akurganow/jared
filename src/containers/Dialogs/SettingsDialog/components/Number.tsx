import { useSelector } from 'react-redux'
import { selectedSetting } from 'store/selectors/settings'
import type { SettingTypeNumber } from 'types/settings'
import st from '../styles.module.css'
import type { SettingsFieldProps } from './types'

export default function NumberOption({ setting }: SettingsFieldProps) {
	const { value, name, max, min, step } = useSelector(selectedSetting(setting)) as unknown as SettingTypeNumber

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input name={setting} defaultValue={value} type="number" max={max} min={min} step={step} />
			</div>
		</>
	)
}
