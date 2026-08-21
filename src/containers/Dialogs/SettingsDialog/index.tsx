import type { ThunkDispatch } from '@reduxjs/toolkit'
import Button from 'components/Button'

import Dialog, { DialogBody, DialogFooter } from 'components/Dialog'
import type { Tab } from 'components/Tabs'
import Tabs from 'components/Tabs'
import DefaultTab from 'containers/Dialogs/SettingsDialog/tabs/default'
import type { TabRef } from 'containers/Dialogs/SettingsDialog/types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import type { UnknownAction } from 'redux'
import { closeDialog } from 'store/actions/dialogs'
import type { RootState } from 'store/types'

export default function SettingsDialog() {
	const dispatch: ThunkDispatch<RootState, never, UnknownAction> = useDispatch()
	const [isButtonsDisabled, setIsButtonsDisabled] = useState<{ [k in string]: boolean }>({})
	const [activeTab, setActiveTab] = useState('default')

	const defaultTabRef = useRef<TabRef>(null)

	const handleCanSave = useCallback(
		(id: string) => (isCanSave: boolean) => {
			setIsButtonsDisabled((prev) => ({
				...prev,
				[id]: !isCanSave,
			}))
		},
		[],
	)

	const handleRefSave = useCallback(() => {
		switch (activeTab) {
			case 'default':
				defaultTabRef.current?.save()
				break
		}
	}, [activeTab])

	const handleApply = useCallback(() => {
		handleRefSave()
	}, [handleRefSave])

	const handleSave = useCallback(() => {
		handleRefSave()
		dispatch(closeDialog('settings'))
	}, [dispatch, handleRefSave])

	const handleClose = useCallback(() => {
		dispatch(closeDialog('settings'))
	}, [dispatch])

	const handleTabSwitch = useCallback((id: string) => {
		setActiveTab(id)
	}, [])

	const tabs = useMemo<Tab[]>(
		() => [
			{
				id: 'default',
				title: 'Settings',
				children: <DefaultTab ref={defaultTabRef} setCanSave={handleCanSave('default')} />,
				disabled: false,
			},
		],
		[handleCanSave],
	)

	console.log('render SettingsDialog', activeTab)

	return (
		<Dialog name="settings">
			<DialogBody>
				<Tabs items={tabs} onTabSwitched={handleTabSwitch} />
			</DialogBody>
			<DialogFooter>
				<Button disabled={isButtonsDisabled[activeTab] ?? true} onClick={handleApply} text="Apply" />
				<Button disabled={isButtonsDisabled[activeTab] ?? true} onClick={handleSave} text="Save" variant="action" />
				<Button onClick={handleClose} text="Close" />
			</DialogFooter>
		</Dialog>
	)
}
