import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Favicon from 'components/Favicon'

// В Storybook chrome.runtime.getURL замокан и отдаёт статичную заглушку
const meta: Meta<typeof Favicon> = {
	title: 'UI/Favicon',
	component: Favicon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		href: 'https://github.com',
		size: 32,
	},
}
