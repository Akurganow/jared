import { ComponentProps } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import mocked from './mock'
import st from './styles.module.css'
import Tabs from './index'

const meta: Meta<ComponentProps<typeof Tabs>> = {
	title: 'UI/Tabs',
	argTypes: {
		items: { control: { disable: true } },
	},
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'tabs'],
	component: Tabs,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		items: mocked.items as ComponentProps<typeof Tabs>['items']
	},
	play: async ({ canvasElement, step }) => {
		const canvas= within(canvasElement)

		const getActiveIndex = (): number => {
			return canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')
				.findIndex(item =>
					item.classList.contains(st.active)
				)
		}

		await step('Tabs should be rendered', async () => {
			const tabs = canvas.getByTestId('Tabs')
			const content = canvas.getByTestId('Tabs:Content')
			const items = canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')

			await expect(tabs).toBeInTheDocument()
			await expect(content).toBeInTheDocument()
			await expect(items).toHaveLength(mocked.items.length)
		})

		await step('Tabs should have active item', async () => {
			const contentItem = canvas.getByTestId('Tabs:ContentItem')

			await expect(getActiveIndex()).toBe(0)
			await expect(contentItem).toBeInTheDocument()
		})

		await step('Click on disabled item should not change active item', async () => {
			const disabledItem = canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')
				.find(item => item.disabled)

			if (!disabledItem) throw new Error('Disabled item not found')

			await disabledItem.click()

			await expect(getActiveIndex()).toBe(0)
		})

		await step('Click on enabled item should change active item', async () => {
			const items = canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')
			const enabledItemIndex = items.findIndex(item =>
				!item.disabled && !item.classList.contains(st.active)
			)

			if (enabledItemIndex < 0) throw new Error('Enabled item not found')

			await items[enabledItemIndex].click()

			await expect(getActiveIndex()).toBe(enabledItemIndex)
			await expect(canvas.getByTestId('Tabs:ContentItem').dataset.index).toBe(enabledItemIndex.toString())
		})

		await step('Click on active item should not change active item', async () => {
			const items = canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')
			const activeItemIndex = items.findIndex(item =>
				item.classList.contains(st.active)
			)

			if (activeItemIndex < 0) throw new Error('Active item not found')

			await items[activeItemIndex].click()

			await expect(getActiveIndex()).toBe(activeItemIndex)
		})

		// TODO: add accessibility tests

		await canvas.getAllByTestId<HTMLButtonElement>('Tabs:Item')[0].click()
	},
}
