import { useSelector } from 'react-redux'
import { selectedSettingValue } from 'store/settings'
import { SettingsFieldProps } from './types'

export default function ({ setting }: SettingsFieldProps) {
	const value = useSelector(selectedSettingValue(setting))

	return (
		<div>
			<h1>{setting}: {value}</h1>
		</div>
	)
}
