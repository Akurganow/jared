/* eslint-disable react-hooks/rules-of-hooks */
import { ComponentProps } from 'react'
import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import HistoryItem from 'components/HistoryItem'
import { store, Mockstore } from 'storybook/fixtures/mock-store'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ComponentProps<typeof HistoryItem>> = {
	title: 'UI/HistoryItem',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'history'],
	component: HistoryItem,
	decorators: [
		(story) =>
			<Mockstore>
				<div style={{ width: '16rem' }}>
					{story()}
				</div>
			</Mockstore>,
	],
	play: async ({ canvasElement , args }) => {
		const canvas = within(canvasElement)
		const item = canvas.getByTestId('HistoryItem')
		const pinButton = canvas.getByTestId('HistoryItem:PinButton')

		await expect(item).toBeInTheDocument()
		await expect(item).toHaveAttribute('href', args.url)
		await expect(item).toHaveAttribute('title', args.title)
		await expect(item).toHaveTextContent(`${args.type} ${args.name}${args.title}`)
		await expect(pinButton).toBeInTheDocument()

		pinButton.click()

		await expect(store.dispatch).toBeCalledWith({
			payload: args.id,
			type: `history/${args.pinned ? 'unpinItem' : 'pinItem'}`,
		})
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Github: Story = {
	args: {
		id: 'github-id',
		title: 'Github',
		name: 'repo/Github',
		url: 'https://github.com',
		type: 'repo',
		provider: 'github',
		pinned: false,
	}
}

export const PinnedGithub: Story = {
	args: {
		id: 'github-id',
		title: 'Github',
		name: 'repo/Github',
		url: 'https://github.com',
		type: 'repo',
		provider: 'github',
		pinned: true,
	}
}

export const Gitlab: Story = {
	args: {
		id: 'gitlab-id',
		title: 'Gitlub',
		name: 'repo/Gitlab',
		url: 'https://gitlab.com',
		type: 'repo',
		provider: 'gitlab',
		pinned: false,
	}
}

export const Jira: Story = {
	args: {
		id: 'jira-id',
		title: 'Jira',
		name: 'issue/Jira',
		url: 'https://jira.atlassian.com',
		type: 'issue',
		provider: 'jira',
		pinned: false,
	}
}
