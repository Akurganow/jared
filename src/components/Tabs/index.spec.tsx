import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs, { type Tab } from 'components/Tabs'

const items: Tab[] = [
	{ id: 'first', title: 'First', children: <div>First content</div> },
	{ id: 'second', title: 'Second', children: <div>Second content</div> },
	{ id: 'disabled', title: 'Disabled', disabled: true },
]

describe('Tabs', () => {
	test('показывает первый таб активным', () => {
		render(<Tabs items={items} withoutPreflight />)

		expect(screen.getByText('First content')).toBeVisible()
		expect(screen.getAllByTestId('Tabs:Item')).toHaveLength(3)
	})

	test('переключает контент и сообщает id таба', async () => {
		const user = userEvent.setup()
		const onTabSwitched = jest.fn()

		render(<Tabs items={items} onTabSwitched={onTabSwitched} withoutPreflight />)

		await user.click(screen.getByRole('button', { name: 'Second' }))

		expect(onTabSwitched).toHaveBeenCalledWith('second')
		expect(screen.getByTestId('Tabs:ContentItem')).toHaveAttribute('data-index', '1')
	})

	test('задизейбленный таб не переключается', async () => {
		const user = userEvent.setup()
		const onTabSwitched = jest.fn()

		render(<Tabs items={items} onTabSwitched={onTabSwitched} withoutPreflight />)

		await user.click(screen.getByRole('button', { name: 'Disabled' })).catch(() => {})

		expect(onTabSwitched).not.toHaveBeenCalled()
	})
})
