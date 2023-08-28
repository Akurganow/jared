import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import isEqual from 'lodash/isEqual'
import { useMemo, useState } from 'react'
import Dialog, { DialogHeader, DialogBody, DialogFooter } from 'components/Dialog'
import { selectedSettings, selectedSettingsKeys, selectedSettingType, setSettings, SettingsState } from 'store/settings'
import { getHistory } from 'store/history'
import { RootState } from 'store/types'
import settingsTypes from './components'
import st from './styles.module.css'

const settingsField = (key: keyof SettingsState) => {
	const type = useSelector(selectedSettingType(key))

	if (type === undefined) {
		return <div>No such type for setting {key}</div>
	}

	const Field = settingsTypes[type]

	return <Field key={key} setting={key} />
}
export default function () {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch()
	const keys = useSelector(selectedSettingsKeys)
	const settings = useSelector(selectedSettings)
	const [newSettings, setNewSettings] = useState({ ...settings } as SettingsState)

	const createUpdatedSettings = useMemo(() => (name: keyof SettingsState, value: SettingsState[keyof SettingsState]['value'], type: string) => {
		const parsedValue = type === 'number' ? parseInt(value as string) : value
		return {
			...newSettings,
			[name]: {
				...newSettings[name],
				value: parsedValue,
			}
		}
	}, [newSettings])

	const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		const value = event.target.value as SettingsState[keyof SettingsState]['value']
		const name = event.target.name as keyof SettingsState

		if (keys.includes(name as keyof SettingsState)) {
			const type = settings[name].type

			setNewSettings(createUpdatedSettings(name, value, type))
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		dispatch(setSettings(newSettings))
		dispatch(getHistory())
	}

	return <Dialog name="settings">
		<DialogHeader>Settings</DialogHeader>
		<DialogBody>
			<form
				id="settings-form"
				className={st.container}
				onSubmit={handleSubmit}
				onChange={handleChange}
			>
				{keys.map(settingsField)}
			</form>
		</DialogBody>
		<DialogFooter>
			<button
				type="submit"
				form="settings-form"
				disabled={isEqual(settings, newSettings)}
			>
				Save
			</button>
		</DialogFooter>
	</Dialog>
}
