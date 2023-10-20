import { expect } from '@storybook/jest'
import { within } from '@storybook/testing-library'
import HistoryItem from 'components/HistoryItem'
import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ComponentProps<typeof HistoryItem>> = {
	title: 'UI/HistoryItem',
	argTypes: {
		id: { control: { disable: true } },
		title: { control: 'text', description: 'Title of the item' },
		name: { control: 'text', description: 'Name of the item' },
		url: { control: 'text', description: 'URL of the item' },
	},
	parameters: {
		layout: 'centered',
		actions: {
			argTypesRegex: '^(on|switch).*',
		},
	},
	tags: ['autodocs', 'ui', 'history'],
	component: HistoryItem,
	decorators: [
		(story) =>
			<div style={{ width: '15rem' }}>
				{story()}
			</div>,
	],
	play: async ({ canvasElement , args }) => {
		const canvas = within(canvasElement)
		const item = canvas.getByTestId('HistoryItem')
		const pinButton = canvas.getByTestId('HistoryItem:PinButton')

		await expect(item).toBeInTheDocument()
		await expect(item).toHaveAttribute('href', args.url)
		await expect(item).toHaveAttribute('title', args.title)
		await expect(item).toHaveAttribute('class', expect.stringContaining('item'))
		await expect(item).toContainElement(canvas.getByTestId('HistoryItem:name'))
		await expect(item).toContainElement(canvas.getByTestId('HistoryItem:PinButton'))
		await expect(item).toHaveTextContent(`${args.name}${args.title}`)
		await expect(pinButton).toBeInTheDocument()
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Github: Story = {
	args: {
		id: 'github-id',
		title: 'Github',
		name: 'repository/Github',
		url: 'https://github.com',
		type: 'repository',
		provider: 'github',
		pinned: false,
	}
}

export const PinnedGithub: Story = {
	args: {
		id: 'github-id',
		title: 'Github',
		name: 'repository/Github',
		url: 'https://github.com',
		type: 'repository',
		provider: 'github',
		pinned: true,
	}
}

export const Gitlab: Story = {
	args: {
		id: 'gitlab-id',
		title: 'Gitlub',
		name: 'repository/Gitlab',
		url: 'https://gitlab.com',
		type: 'repository',
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

export const LargeText: Story = {
	args: {
		id: 'webextension-toolbox-id',
		title: 'Small CLI toolbox for cross-browser WebExtension development',
		name: 'webextension-toolbox/webextension-toolbox',
		url: 'https://github.com/webextension-toolbox/webextension-toolbox/',
		type: 'repository',
		provider: 'github',
		pinned: false,
	}
}

export const Unknown: Story = {
	argTypes: {
		name: { control: { disable: true } },
		type: { control: { disable: true } },
	},
	args: {
		id: 'unknown-id',
		title: 'Unknown',
		name: '',
		url: 'https://unknown.com',
		type: 'unknown',
		provider: 'unknown',
		pinned: false,
	},
}
