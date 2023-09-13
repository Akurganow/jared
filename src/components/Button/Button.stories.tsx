import Button from 'components/Button'
import type { Meta, StoryObj } from '@storybook/react'

type ButtonPropsAndCustom = React.ComponentProps<typeof Button> & { text?: string }
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
	}
}

export const Emojis: Story = {
	args: {
		text: '😀 😎 👍 💯',
	}
}
