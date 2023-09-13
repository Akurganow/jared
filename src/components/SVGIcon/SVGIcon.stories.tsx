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
	render: () => (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			gap: '1rem',
			flexWrap: 'wrap',
			fontSize: '2rem',
		}}>
			{Object.keys(icons).map((icon) => (
				<div key={icon} title={`<SVGIcon name="${icon}" />`} style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '0.25rem'
				}}>
					<SVGIcon name={icon as keyof typeof icons} />
				</div>
			))}
		</div>
	)
}

export default meta

type Story = StoryObj<typeof meta>

export const Icons: Story = {}
