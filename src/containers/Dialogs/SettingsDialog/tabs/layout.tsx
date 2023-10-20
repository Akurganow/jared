import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import isEqual from 'lodash/isEqual'
import st from 'containers/Dialogs/SettingsDialog/styles.module.css'
import { setLayout } from 'store/actions/settings'
import { updateHistory } from 'store/actions/history'
import { selectedLayoutSettings } from 'store/selectors/settings'
import LayoutSelect from 'components/LayoutSelect'
// import type { ChangeEvent } from 'react'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { AnyAction } from 'redux'
import type { RootState } from 'store/types'
import type { TabProps, TabRef } from 'containers/Dialogs/SettingsDialog/types'
import type { LayoutType } from 'types/settings'

type LayoutSetting = ReturnType<typeof selectedLayoutSettings>
type LayoutSettingValue = LayoutSetting['value']

export default forwardRef<TabRef, TabProps<HTMLFormElement>>(({ setCanSave, ...props }, ref) => {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch()
	const layout = useSelector(selectedLayoutSettings)
	const [updatedLayout, setUpdatedLayout] = useState(layout)

	const createUpdatedLayout = useCallback((key: keyof LayoutSettingValue, value: LayoutSettingValue[keyof LayoutSettingValue]): LayoutSetting => {
		return { ...updatedLayout, value: { ...updatedLayout.value, [key]: value } }
	}, [updatedLayout])

	const handleNameChange = useCallback((newName: LayoutType) => {
		const newLayout = createUpdatedLayout('name', newName)
		setUpdatedLayout(newLayout)
		setCanSave(!isEqual(newLayout, layout))
	}, [createUpdatedLayout, layout, setCanSave])

	// const handleConfigChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
	// 	const name = event.target.name as keyof LayoutSettingValue
	// 	const value = event.target.value as LayoutSettingValue[keyof LayoutSettingValue]
	// 	const newLayout = createUpdatedLayout(name, value)
	// 	setUpdatedLayout(newLayout)
	// 	setCanSave(!isEqual(newLayout, layout))
	// }, [createUpdatedLayout, layout, setCanSave])

	useImperativeHandle(ref, () => ({
		save() {
			dispatch(setLayout(updatedLayout))
			dispatch(updateHistory())
			setCanSave(false)
		},
	}))

	return <>
		<LayoutSelect current={updatedLayout.value.name} onChange={handleNameChange} />
		<form
			id="settings-layout-form"
			className={cn(st.layout, st.container)}
			{...props}
		>
			Layout {updatedLayout.value.name}
		</form>
	</>
})
