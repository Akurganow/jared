import { useDispatch, useSelector } from 'react-redux'
import capitalize from 'lodash/capitalize'
import cn from 'classnames'
import { ChangeEvent, useCallback, useMemo } from 'react'
import { selectedProcessingSettings } from 'store/selectors/settings'
import st from 'containers/dialogs/SettingsDialog/styles.module.css'
import { setProcessingOptions } from 'store/actions/settings'
import { processingSettingsToUI } from 'utils/settings/processing'
import type { TabProps } from 'containers/dialogs/SettingsDialog/types'

export default function ProcessingSettingsTab({ ...props }: TabProps<HTMLFormElement>) {
	const dispatch = useDispatch()
	const processing = useSelector(selectedProcessingSettings)
	const processingUI = useMemo(
		() => processingSettingsToUI(processing),
		[processing],
	)

	type ProcessingProvider = keyof typeof processing['providers']
	type ProcessingOption = typeof processing['providers'][ProcessingProvider]['disabled'][number]

	const providerKeys = useMemo(
		() => Object.keys(processingUI) as (keyof typeof processingUI)[],
		[processingUI],
	)

	const handleSettingChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const disabled = !event.target.checked
		const name = event.target.name

		const [provider, option] = name.split('.') as [ProcessingProvider, ProcessingOption]

		dispatch(setProcessingOptions({ provider, option, disabled }))
	}, [dispatch])

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
}
