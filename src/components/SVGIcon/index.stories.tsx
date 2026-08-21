import type { Meta, StoryObj } from '@storybook/react-webpack5'
import SVGIcon from 'components/SVGIcon'
import * as icons from 'components/SVGIcon/icons'
import { expect, within } from 'storybook/test'

const meta: Meta = {
	title: 'UI/SVGIcon',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'svg', 'icons'],
	component: SVGIcon,
	decorators: [
		(Story) => (
			<div style={{ fontSize: '3rem' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		name: {
			control: 'select',
			options: Object.keys(icons),
		},
	},
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {
	args: {
		name: 'settings',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement)
		const icon = canvas.getByTestId('SVGIcon')

		await expect(icon).toBeInTheDocument()
	},
}
