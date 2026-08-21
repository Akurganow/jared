import path from 'node:path'
import { type BrowserContext, test as base, chromium } from '@playwright/test'

const BROWSER = process.env.TARGET_BROWSER || 'chrome'

export const test = base.extend<{
	context: BrowserContext
}>({
	// biome-ignore lint/correctness/noEmptyPattern: Playwright требует деструктуризацию первого аргумента фикстуры
	context: async ({}, use) => {
		const pathToExtension = path.resolve(__dirname, `../../dist/${BROWSER}`)
		console.log(`Using extension at ${pathToExtension}`)
		const context = await chromium.launchPersistentContext('', {
			headless: false,
			args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
		})
		await use(context)
		await context.close()
	},
})

export const expect = test.expect
