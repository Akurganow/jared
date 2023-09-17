import { ComponentProps } from 'react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import Button from 'components/Button'
import type { Meta, StoryObj } from '@storybook/react'

type ButtonPropsAndCustom = ComponentProps<typeof Button> & { text?: string }
const meta: Meta<ButtonPropsAndCustom> = {
	title: 'UI/Button',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'form'],
	argTypes: {
		disabled: { control: 'boolean' },
	},
	component: Button,
	render: ({ text, ...args }) => (
		<Button {...args}>{text}</Button>
	)
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		text: 'Default Button',
	},
	play: async ({ canvasElement }) => {
		const canvas= within(canvasElement)
		const button = canvas.getByTestId('Button')

		await expect(button).toBeInTheDocument()
		await expect(button).toBeEnabled()
	},
}

export const Emojis: Story = {
	args: {
		text: '😀 😎 👍 💯',
	}
}

export const Disabled: Story = {
	args: {
		text: 'Disabled Button',
		disabled: true,
	},
	play: async ({ canvasElement }) => {
		const canvas= within(canvasElement)
		const button = canvas.getByTestId('Button')

		await expect(button).toBeInTheDocument()
		await expect(button).toBeDisabled()
	},
}
