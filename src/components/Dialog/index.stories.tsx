/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import Dialog, { DialogBody, DialogFooter, DialogHeader } from 'components/Dialog'
import Button from 'components/Button'

const meta: Meta<ComponentProps<typeof Dialog>> = {
	title: 'UI/Dialog',
	argTypes: {
		name: { control: { disable: true } },
		isOpen: { control: { disable: true } },
		isClickOutsideClose: { control: { disable: true } },
	},
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs', 'ui', 'dialog'],
	component: Dialog,
	decorators: [
		(story) =>
			<div id="dialog">
				<style>{`
				#dialog input,
				#dialog select,
				#dialog textarea {
						width: 100%;
						border: 1px solid var(--area-form-border);
						background-color: var(--area-form-background);
						padding: 5px;
						font-size: var(--basic-fontSize);
						color: var(--area-form-foreground);
				}
				`}</style>
				{story()}
			</div>
	],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render: ({ ...args }) =>
		<div style={{ width: '25rem' }}>
			<DialogHeader>Dialog</DialogHeader>

			<DialogBody>
				<form id="test" name="test" style={{
					display: 'grid',
					gridTemplateColumns: 'minmax(max-content, 5rem) 1fr',
					gridAutoRows: 'max-content',
					gridGap: '0.25rem',
					alignContent: 'center',
					alignItems: 'center',
					margin: '0.25rem 0',
				}}>
					<label htmlFor="name">Name</label>
					<input id="name" type="text" placeholder="Enter name" required />

					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Enter email" required />

					<label htmlFor="password">Password</label>
					<input id="password" type="password" placeholder="Enter password" required />
				</form>
			</DialogBody>

			<DialogFooter>
				<Button disabled type="submit" form="test" name="save">Save</Button>
				<Button type="reset" form="test" name="reset">Reset</Button>
			</DialogFooter>
		</div>
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
