import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import { Mockstore } from 'storybook/fixtures/mock-store'
import HistoryItemList from 'components/HistoryItemList/index'
import { vcsMock, itsMock } from 'components/HistoryItemList/index.mock'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ComponentProps<typeof HistoryItemList>> = {
	title: 'UI/HistoryItemList',
	argTypes: {
		items: { control: { disable: true } },
		className: { control: 'text' },
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
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement)
		const items = canvas.getAllByTestId('HistoryItem')
		const list = canvas.getByTestId('HistoryItemList')

		await expect(items).toHaveLength(args.items.length)
		await expect(list).toHaveAttribute('class', expect.stringContaining('container'))
		await expect(list).toHaveAttribute('class', expect.stringContaining(args.className as string))
	}
}
export default meta
type Story = StoryObj<typeof meta>

export const VCS: Story = {
	args: {
		items: vcsMock,
		className: 'test',
	}
}

export const ITS: Story = {
	args: {
		items: itsMock,
		className: 'test',
	}
}
