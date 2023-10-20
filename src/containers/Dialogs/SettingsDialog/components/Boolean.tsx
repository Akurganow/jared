import { useSelector } from 'react-redux'
import { selectedSetting } from 'store/selectors/settings'
import st from '../styles.module.css'
import type { SettingsFieldProps } from './types'
import type { SettingTypeBoolean } from 'types/settings'

export default function ({ setting }: SettingsFieldProps) {
	const { value, name } = useSelector(selectedSetting(setting)) as unknown as SettingTypeBoolean

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<input name={setting} type="checkbox" defaultChecked={value} />
			</div>
		</>
	)
}
