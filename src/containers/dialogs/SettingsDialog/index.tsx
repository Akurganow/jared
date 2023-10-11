import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import isEqual from 'lodash/isEqual'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import Dialog, { DialogBody, DialogFooter } from 'components/Dialog'
import Button from 'components/Button'
import Tabs from 'components/Tabs'

import { closeDialog } from 'store/actions/dialogs'
import { updateHistory } from 'store/actions/history'
import { setSettings } from 'store/actions/settings'
import { selectedSettings, selectedSettingsKeys } from 'store/selectors/settings'

import DefaultTab from 'containers/dialogs/SettingsDialog/tabs/default'
import ProcessingTab from 'containers/dialogs/SettingsDialog/tabs/processing'

import type { Tab } from 'components/Tabs'
import type { RootState } from 'store/types'
import type { SettingsState } from 'types/settings'

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

	const handleSettingChange = useCallback((event: ChangeEvent<HTMLFormElement>) => {
		const value = event.target.value as SettingsState[keyof SettingsState]['value']
		const name = event.target.name as keyof SettingsState

		if (settingKeys.includes(name as keyof SettingsState)) {
			const type = currentSettings[name].type

			setUpdatedSettings(createUpdatedSettings(name, value, type))
		}
	}, [settingKeys, currentSettings, createUpdatedSettings])

	const handleSettingsSave = useCallback(() => {
		dispatch(setSettings(updatedSettings))
		dispatch(updateHistory())
		dispatch(closeDialog('settings'))
	}, [dispatch, updatedSettings])

	const handleApply = useCallback(() => {
		dispatch(setSettings(updatedSettings))
		dispatch(updateHistory())
	}, [dispatch, updatedSettings])

	const handleClose = useCallback(() => {
		dispatch(closeDialog('settings'))
	}, [dispatch])

	const isDisabledSave = useMemo(() =>
		isEqual(currentSettings, updatedSettings),
	[currentSettings, updatedSettings],
	)

	const tabs: Tab[] = [
		{
			title: 'Settings',
			children: <DefaultTab onChange={handleSettingChange} />,
			disabled: false,
		},
		{
			title: 'Processing',
			children: <ProcessingTab onChange={handleSettingChange} />,
			disabled: false,
		}
	]

	return <Dialog name="settings">
		<DialogBody>
			<Tabs items={tabs} />
		</DialogBody>
		<DialogFooter>
			<Button disabled={isDisabledSave} onClick={handleApply} text="Apply" />
			<Button disabled={isDisabledSave} onClick={handleSettingsSave} text="Save" variant="action"  />
			<Button onClick={handleClose} text="Close" />
		</DialogFooter>
	</Dialog>
}
