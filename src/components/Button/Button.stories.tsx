import Button from 'components/Button'
import type { Meta, StoryObj } from '@storybook/react'

type ButtonPropsAndCustom = React.ComponentProps<typeof Button> & { text?: string }
const meta: Meta<ButtonPropsAndCustom> = {
	title: 'UI/Button',
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
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
