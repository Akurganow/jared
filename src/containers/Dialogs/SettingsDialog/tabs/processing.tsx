import { useDispatch, useSelector } from 'react-redux'
import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { selectedProcessingSettings } from 'store/selectors/settings'
import st from 'containers/Dialogs/SettingsDialog/styles.module.css'
import { setProcessing } from 'store/actions/settings'
import { processingSettingsToUI } from 'utils/settings/processing'
import { updateHistory } from 'store/actions/history'
import { RootState } from 'store/types'
import { TabRef } from 'containers/Dialogs/SettingsDialog/types'
import type { TabProps } from 'containers/Dialogs/SettingsDialog/types'

export default forwardRef<TabRef, TabProps<HTMLFormElement>>(({ setCanSave, ...props }, ref) => {
	const dispatch: ThunkDispatch<RootState, never, AnyAction> = useDispatch()
	const processing = useSelector(selectedProcessingSettings)
	const [updatedProcessing, setUpdatedProcessing] = useState(processing)
	const processingUI = useMemo(
		() => processingSettingsToUI(updatedProcessing),
		[updatedProcessing],
	)

	type ProcessingProvider = keyof typeof processing['providers']
	type ProcessingOption = typeof processing['providers'][ProcessingProvider]['disabled'][number]

	const providerKeys = useMemo(
		() => Object.keys(processingUI) as (keyof typeof processingUI)[],
		[processingUI],
	)

	const setProcessingOptions = useCallback(({ provider, option, disabled }: { provider: ProcessingProvider, option: ProcessingOption, disabled: boolean }) => {
		let disabledOptions = updatedProcessing.providers[provider].disabled

		if (disabled) {
			disabledOptions = [...disabledOptions, option]
		} else {
			disabledOptions = disabledOptions.filter((opt) => opt !== option)
		}

		const newProcessing = {
			...updatedProcessing,
			providers: {
				...updatedProcessing.providers,
				[provider]: {
					...updatedProcessing.providers[provider],
					disabled: uniq(disabledOptions)
				}
			}
		}

		setUpdatedProcessing(newProcessing)
		setCanSave(!isEqual(processing, newProcessing))
	}, [processing, setCanSave, updatedProcessing])

	const handleSettingChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const disabled = !event.target.checked
		const name = event.target.name

		const [provider, option] = name.split('.') as [ProcessingProvider, ProcessingOption]

		setProcessingOptions({ provider, option, disabled })
	}, [setProcessingOptions])

	useImperativeHandle(ref, () => ({
		save() {
			dispatch(setProcessing(updatedProcessing))
			dispatch(updateHistory())
			setCanSave(false)
		},
	}))

	return <form
		id="settings-processing-form"
		className={cn(st.processing, st.container)}
		{...props}
	>
		{providerKeys.map(provider => {
			const options = processingUI[provider]

			return <div key={provider} className={st.processingItem}>
				<label className={st.providerTitle}>{capitalize(provider)}</label>
				<div className={st.processingItemContent}>
					{options.map(({ name, disabled }) => {
						return <div
							key={`${provider}${name}`}
							className={st.processingItemOption}
						>
							<label>
								<input
									type="checkbox"
									name={`${provider}.${name}`}
									checked={!disabled}
									onChange={handleSettingChange}
								/>
								{capitalize(name)}
							</label>
						</div>
					})}
				</div>
			</div>
		})}
	</form>
})
