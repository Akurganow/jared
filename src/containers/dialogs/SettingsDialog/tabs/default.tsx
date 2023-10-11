import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import isEqual from 'lodash/isEqual'
import { selectedSettings, selectedSettingsKeys, selectedSettingType } from 'store/selectors/settings'
import settingsTypes from 'containers/dialogs/SettingsDialog/components'
import st from 'containers/dialogs/SettingsDialog/styles.module.css'
import { setSettings } from 'store/actions/settings'
import { updateHistory } from 'store/actions/history'
import { RootState } from 'store/types'
import type { SettingsState } from 'types/settings'
import type { TabProps, TabRef } from 'containers/dialogs/SettingsDialog/types'

const SettingsField = (key: keyof SettingsState) => {
	const type = useSelector(selectedSettingType(key))

	if (type && type !== 'custom') {
		const Field = settingsTypes[type]

		return <Field key={key} setting={key} />
	}

	return null
}

// export default function DefaultSettingsTab({ ...props }: TabProps<HTMLFormElement>) {
export default forwardRef<TabRef, TabProps<HTMLFormElement>>(({ setCanSave, ...props }, ref) => {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch()

	const settingKeys = useSelector(selectedSettingsKeys)
	const currentSettings = useSelector(selectedSettings)
	const [updatedSettings, setUpdatedSettings] = useState({ ...currentSettings } as SettingsState)

	const createUpdatedSettings = useCallback((name: keyof SettingsState, value: SettingsState[keyof SettingsState]['value'], type: string) => {
		const parsedValue = type === 'number' ? parseInt(value as string) : value
		return {
			...updatedSettings,
			[name]: {
				...updatedSettings[name],
				value: parsedValue,
			}
		}
	}, [updatedSettings])

	const handleChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		const value = event.target.value as SettingsState[keyof SettingsState]['value']
		const name = event.target.name as keyof SettingsState

		if (settingKeys.includes(name as keyof SettingsState)) {
			const type = currentSettings[name].type

			const newSettings = createUpdatedSettings(name, value, type)

			setUpdatedSettings(newSettings)
			setCanSave(!isEqual(currentSettings, newSettings))
		}
	}, [settingKeys, currentSettings, createUpdatedSettings, setCanSave])

	useImperativeHandle(ref, () => ({
		save() {
			dispatch(setSettings(updatedSettings))
			dispatch(updateHistory())
			setCanSave(false)
		},
	}))

	return <form
		id="settings-default-form"
		className={st.container}
		onChange={handleChange}
		{...props}
	>
		{settingKeys.map(SettingsField)}
	</form>
})
