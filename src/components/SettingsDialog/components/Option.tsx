import { useSelector } from 'react-redux'
import { selectedSetting, SettingItem } from 'store/settings'
import { SettingsFieldProps } from './types'

export default function ({ setting }: SettingsFieldProps) {
	const { value, options } = useSelector(selectedSetting(setting)) as unknown as SettingItem<string>
	console.log(setting, value, options)
	return (
		<div>
			{setting}: <select value={value}>
				{options?.map(option =>
					<option key={option} value={option} selected={option === value}>{option}</option>)
				}
			</select>
		</div>
	)
}
