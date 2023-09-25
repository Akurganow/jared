import { useSelector } from 'react-redux'
import { selectedSettingsKeys, selectedSettingType } from 'store/selectors/settings'
import settingsTypes from 'containers/dialogs/SettingsDialog/components'
import st from 'containers/dialogs/SettingsDialog/styles.module.css'
import type { TabProps } from 'containers/dialogs/SettingsDialog/types'
import type { SettingsState } from 'types/settings'

const SettingsField = (key: keyof SettingsState) => {
	const type = useSelector(selectedSettingType(key))

	if (type && type !== 'custom') {
		const Field = settingsTypes[type]

		return <Field key={key} setting={key} />
	}

	return null
}

export default function DefaultSettingsTab({ ...props }: TabProps<HTMLFormElement>) {
	const settingKeys = useSelector(selectedSettingsKeys)

	return <form
		id="settings-default-form"
		className={st.container}
		{...props}
	>
		{settingKeys.map(SettingsField)}
	</form>
}
