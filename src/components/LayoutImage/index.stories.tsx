import LayoutImage from 'components/LayoutImage'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { LayoutType } from 'types/settings'

const meta: Meta<ComponentProps<typeof LayoutImage>> = {
	title: 'UI/LayoutImage',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'form'],
	argTypes: {
		layout: { options: ['full', 'compact'] as LayoutType[], control: { type: 'radio' } },
	},
	component: LayoutImage,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		layout: 'full' as LayoutType,
	}
}
