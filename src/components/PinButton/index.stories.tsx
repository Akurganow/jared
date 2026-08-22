import type { Meta, StoryObj } from '@storybook/react-webpack5'
import PinButton from 'components/PinButton'
import { expect, fn, within } from 'storybook/test'

const meta: Meta<typeof PinButton> = {
	title: 'UI/PinButton',
	component: PinButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui'],
	args: {
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Unpinned: Story = {
	args: {
		pinned: false,
	},
	play: async ({ canvasElement, args, userEvent }) => {
		const canvas = within(canvasElement)
		const button = canvas.getByRole('button')

		await userEvent.click(button)
		await expect(args.onClick).toHaveBeenCalled()
	},
}

export const Pinned: Story = {
	args: {
		pinned: true,
	},
}
