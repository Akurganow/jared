import type { Meta, StoryObj } from '@storybook/react-webpack5'
import SidebarItem from 'components/SidebarItem'
import { Mockstore } from 'storybook-fixtures/mock-store'

const meta: Meta<typeof SidebarItem> = {
	title: 'UI/SidebarItem',
	component: SidebarItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui'],
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
	args: {
		name: 'settings',
		icon: 'settings',
		tooltip: null,
	},
}

export const WithTooltip: Story = {
	args: {
		name: 'download',
		icon: 'download',
		tooltip: <span>Downloads</span>,
	},
}
