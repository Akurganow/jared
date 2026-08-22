import type { Meta, StoryObj } from '@storybook/react-webpack5'
import NewTab from 'containers/NewTab'
import { expect, waitFor, within } from 'storybook/test'
import { Mockstore } from 'storybook-fixtures/mock-store'

// Композиционная стори: весь экран новой вкладки на моках chrome.* —
// секции сами запрашивают историю/закладки у замоканного браузера
const meta: Meta<typeof NewTab> = {
	title: 'Containers/NewTab',
	component: NewTab,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs', 'container'],
	decorators: [
		(Story) => (
			<Mockstore state={{}}>
				<Story />
			</Mockstore>
		),
	],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)

		// секции получают данные из мока асинхронно
		await waitFor(
			async () => {
				const items = canvas.getAllByTestId('HistoryItem')

				await expect(items.length).toBeGreaterThan(0)
			},
			{ timeout: 10000 },
		)
	},
}

export const EditMode: Story = {
	play: async ({ canvasElement, userEvent }) => {
		const canvas = within(canvasElement)

		// первая кнопка в сайдбаре включает режим редактирования —
		// секции должны показать свои заголовки
		const sidebarButtons = canvas.getAllByRole('button')
		await userEvent.click(sidebarButtons[0])

		await waitFor(async () => {
			const headings = canvas.getAllByRole('heading')

			await expect(headings.length).toBeGreaterThan(0)
		})
	},
}
