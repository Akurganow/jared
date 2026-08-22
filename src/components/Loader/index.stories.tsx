import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Loader from 'components/Loader'

const meta: Meta<typeof Loader> = {
	title: 'UI/Loader',
	component: Loader,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
