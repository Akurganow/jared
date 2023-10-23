import { useDispatch } from 'react-redux'
import { useCallback, useRef, useState } from 'react'

import Dialog, { DialogBody, DialogFooter } from 'components/Dialog'
import Button from 'components/Button'
import Tabs from 'components/Tabs'

import { closeDialog } from 'store/actions/dialogs'

import DefaultTab from 'containers/Dialogs/SettingsDialog/tabs/default'

import { TabRef } from 'containers/Dialogs/SettingsDialog/types'
import type { AnyAction } from 'redux'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { Tab } from 'components/Tabs'
import type { RootState } from 'store/types'

export default function () {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch()
	const [isButtonsDisabled, setIsButtonsDisabled] = useState<{ [k in string]: boolean }>({})
	const [activeTab, setActiveTab] = useState('default')

	const defaultTabRef = useRef<TabRef>(null)
	const processingTabRef = useRef<TabRef>(null)
	const layoutTabRef = useRef<TabRef>(null)

	const handleCanSave = useCallback((id: string) => (isCanSave: boolean) => {
		setIsButtonsDisabled((prev) => ({
			...prev,
			[id]: !isCanSave,
		}))
	}, [])

	const handleRefSave = useCallback(() => {
		switch (activeTab) {
		case 'default':
			defaultTabRef.current?.save()
			break
		case 'processing':
			processingTabRef.current?.save()
			break
		case 'layout':
			layoutTabRef.current?.save()
		}
	}, [activeTab, defaultTabRef, processingTabRef])

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

	const tabs: Tab[] = [
		{
			id: 'default',
			title: 'Settings',
			children: <DefaultTab
				ref={defaultTabRef}
				setCanSave={handleCanSave('default')}
			/>,
			disabled: false,
		},
	]

	return <Dialog name="settings">
		<DialogBody>
			<Tabs items={tabs} onTabSwitched={handleTabSwitch}/>
		</DialogBody>
		<DialogFooter>
			<Button disabled={isButtonsDisabled[activeTab] ?? true} onClick={handleApply} text="Apply" />
			<Button disabled={isButtonsDisabled[activeTab] ?? true} onClick={handleSave} text="Save" variant="action"  />
			<Button onClick={handleClose} text="Close" />
		</DialogFooter>
	</Dialog>
}
