import { processingSettingsToUI } from 'utils/settings/processing'
import {
	allProvidersDisabledUnknown,
	allProvidersDisabledUnknownResult,
} from 'utils/settings/settings.mock'

describe('utils/settings', () => {
	test('processingSettingsToUI', () => {
		const result = processingSettingsToUI(allProvidersDisabledUnknown)

		expect(result).toEqual(allProvidersDisabledUnknownResult)
	})
})
