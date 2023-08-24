import { useSelector } from 'react-redux'
import { Text } from 'dracula-ui'
import { selectedSettingValue } from 'store/settings'
import { SettingsFieldProps } from './types'

export default function ({ setting }: SettingsFieldProps) {
	const value = useSelector(selectedSettingValue(setting))

	return (
		<div>
			<Text>{setting}:</Text> <input value={value}/>
		</div>
	)
}
