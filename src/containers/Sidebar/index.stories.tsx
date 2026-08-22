import type { Meta, StoryObj } from '@storybook/react-webpack5'
import Sidebar from 'containers/Sidebar'
import { Mockstore } from 'storybook-fixtures/mock-store'

const meta: Meta<typeof Sidebar> = {
	title: 'Containers/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'centered',
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

export const Default: Story = {}
