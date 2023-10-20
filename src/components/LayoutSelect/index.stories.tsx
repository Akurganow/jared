import LayoutSelect from 'components/LayoutSelect'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { LayoutType } from 'types/settings'

type LayoutProps = ComponentProps<typeof LayoutSelect>

const meta: Meta<LayoutProps> = {
	title: 'UI/LayoutSelect',
	parameters: {
		layout: 'centered',
		actions: { argTypesRegex: '^on.*' },
	},
	tags: ['autodocs', 'ui', 'form'],
	argTypes: {
		current: {
			options: ['full', 'compact'] as LayoutType[],
			control: { type: 'radio' },
		},
		onChange: { action: 'onChange', type: 'function', name: 'onChange(layout)' },
	},
	component: LayoutSelect,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		current: 'full',
	}
}
