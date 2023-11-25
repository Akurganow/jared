import { test, expect } from './fixtures/install-extension'

test('has title', async ({ context }) => {
	const page = await context.newPage()
	await expect(page).toHaveTitle('New Tab')
})

test('get started link', async ({ page }) => {
	await page.goto('https://playwright.dev/')

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click()

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
})
