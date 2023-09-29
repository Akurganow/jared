import HistoryItemList from 'components/HistoryItemList/index'
import { Mockstore } from 'storybook/fixtures/mock-store'
import { vcsMock, itsMock } from './mock'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ComponentProps<typeof HistoryItemList>> = {
	title: 'UI/HistoryItemList',
	argTypes: {
		items: { control: { disable: true } },
	},
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'history'],
	component: HistoryItemList,
	decorators: [
		(story) =>
			<Mockstore>
				<div style={{ width: '30rem' }}>
					{story()}
				</div>
			</Mockstore>,
	],
}
export default meta
type Story = StoryObj<typeof meta>

export const VCS: Story = {
	args: {
		items: vcsMock
	}
}

export const ITS: Story = {
	args: {
		items: itsMock
	}
}
