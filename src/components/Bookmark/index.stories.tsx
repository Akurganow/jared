import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Bookmark from 'components/Bookmark'
import { expect, fn, within } from 'storybook/test'

const meta: Meta<typeof Bookmark> = {
	title: 'UI/Bookmark',
	component: Bookmark,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui'],
	args: {
		onEditClick: fn(),
		onRemoveClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		id: '42',
		title: 'Jared — better new tab',
		url: 'https://github.com/Akurganow/jared',
		syncing: false,
	},
	play: async ({ canvasElement, args, userEvent }) => {
		const canvas = within(canvasElement)

		await userEvent.click(canvas.getByTitle('Edit bookmark'))
		await expect(args.onEditClick).toHaveBeenCalled()

		await userEvent.click(canvas.getByTitle('Remove bookmark'))
		await expect(args.onRemoveClick).toHaveBeenCalled()
	},
}
