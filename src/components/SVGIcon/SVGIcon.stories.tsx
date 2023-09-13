import SVGIcon from 'components/SVGIcon'
import * as icons from 'components/SVGIcon/icons'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
	title: 'UI/SVGIcon',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'svg', 'icons'],
	component: SVGIcon,
	decorators: [
		Story => (
			<div style={{ fontSize: '3rem', color: '#000' }}>
				<Story />
			</div>)
	],
	argTypes: {
		name: {
			control: 'select',
			options: Object.keys(icons),
		}
	}
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {
	args: {
		name: 'settings'
	}
}
