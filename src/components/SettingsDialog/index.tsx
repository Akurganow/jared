import { useSelector } from 'react-redux'
import Dialog, { DialogHeader, DialogBody, DialogFooter } from 'components/Dialog'
import { selectedSettingsKeys, selectedSettingType } from 'store/settings'
import settingsTypes from './components'

const settingsField = (key: string) => {
	const type = useSelector(selectedSettingType(key))

	if (type === undefined) {
		return <div>No such type for setting {key}</div>
	}

	const Field = settingsTypes[type]

	return <div key={key}>
		<Field setting={key} />
	</div>
}
export default function () {
	const keys = useSelector(selectedSettingsKeys)

	return <Dialog name="settings">
		<DialogHeader>Settings</DialogHeader>
		<DialogBody>
			{keys.map(settingsField)}
		</DialogBody>
		<DialogFooter>Footer</DialogFooter>
	</Dialog>
}
