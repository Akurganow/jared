import path from 'path'
import { test as base, chromium, type BrowserContext } from '@playwright/test'

const BROWSER = process.env.TARGET_BROWSER || 'chrome'

export const test = base.extend<{
  context: BrowserContext;
}>({
	// eslint-disable-next-line no-empty-pattern
	context: async ({ }, use) => {
		const pathToExtension = path.resolve(__dirname, `../../dist/${BROWSER}`)
		console.log(`Using extension at ${pathToExtension}`)
		const context = await chromium.launchPersistentContext('', {
			headless: false,
			args: [
				`--disable-extensions-except=${pathToExtension}`,
				`--load-extension=${pathToExtension}`,
			],
		})
		await use(context)
		await context.close()
	},
})

export const expect = test.expect
