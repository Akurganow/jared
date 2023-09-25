import { getHistoryItemProcessorTypes } from 'utils/history'
import type { SettingsState } from 'types/settings'
import type { ProcessorConfigType, ITSProviderType, VCSProviderType } from 'types/history'

type ProcessingUI = {
	[key in VCSProviderType | ITSProviderType]: {
		type: ProcessorConfigType['type']
		name: ProcessorConfigType['name']
		disabled: boolean
	}[]
}

export function processingSettingsToUI(settings: SettingsState['processing']): ProcessingUI {
	const ui = {} as ProcessingUI
	const providers = settings.providers

	Object.keys(providers).forEach((provider) => {
		const prov = provider as keyof typeof providers
		const config = getHistoryItemProcessorTypes(prov)
		const { disabled } = providers[prov]

		ui[prov] = config.map((item) => {
			const isDisabled = disabled.includes(item.name)

			return {
				type: item.type,
				name: item.name,
				disabled: isDisabled,
			}
		})
	})

	return ui
}
