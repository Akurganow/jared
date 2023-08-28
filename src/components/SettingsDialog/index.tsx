import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import isEqual from 'lodash/isEqual'
import { useCallback, useMemo, useState } from 'react'
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
	const settingKeys = useSelector(selectedSettingsKeys)
	const currentSettings = useSelector(selectedSettings)
	const [updatedSettings, setUpdatedSettings] = useState({ ...currentSettings } as SettingsState)

	const createUpdatedSettings = useMemo(() => (name: keyof SettingsState, value: SettingsState[keyof SettingsState]['value'], type: string) => {
		const parsedValue = type === 'number' ? parseInt(value as string) : value
		return {
			...updatedSettings,
			[name]: {
				...updatedSettings[name],
				value: parsedValue,
			}
		}
	}, [updatedSettings])

	const handleSettingChange = useCallback((event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		const value = event.target.value as SettingsState[keyof SettingsState]['value']
		const name = event.target.name as keyof SettingsState

		if (settingKeys.includes(name as keyof SettingsState)) {
			const type = currentSettings[name].type

			setUpdatedSettings(createUpdatedSettings(name, value, type))
		}
	}, [settingKeys, currentSettings, createUpdatedSettings])

	const handleSettingsSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		dispatch(setSettings(updatedSettings))
		dispatch(getHistory())
	}, [dispatch, updatedSettings])

	return <Dialog name="settings">
		<DialogHeader>Settings</DialogHeader>
		<DialogBody>
			<form
				id="settings-form"
				className={st.container}
				onSubmit={handleSettingsSubmit}
				onChange={handleSettingChange}
			>
				{settingKeys.map(settingsField)}
			</form>
		</DialogBody>
		<DialogFooter>
			<button
				type="submit"
				form="settings-form"
				disabled={isEqual(currentSettings, updatedSettings)}
			>
				Save
			</button>
		</DialogFooter>
	</Dialog>
}
