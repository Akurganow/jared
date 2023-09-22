import { useSelector } from 'react-redux'
import { selectedSetting } from 'store/selectors/settings'
import st from '../styles.module.css'
import { SettingsFieldProps } from './types'

export default function ({ setting }: SettingsFieldProps) {
	const { value, name } = useSelector(selectedSetting(setting))

	return (
		<>
			<div className={st.name}>{name}:</div>
			<div className={st.value}>
				<textarea name={setting} rows={3} cols={50} defaultValue={value} />
			</div>
		</>
	)
}
