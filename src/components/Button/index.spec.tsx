import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from 'components/Button'

describe('Button', () => {
	test('рендерит содержимое и вызывает onClick', async () => {
		const user = userEvent.setup()
		const handleClick = jest.fn()

		render(<Button onClick={handleClick}>Click me</Button>)

		const button = screen.getByTestId('Button')
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent('Click me')

		await user.click(button)
		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	test('в состоянии disabled не реагирует на клики', async () => {
		const user = userEvent.setup()
		const handleClick = jest.fn()

		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		)

		const button = screen.getByTestId('Button')
		expect(button).toBeDisabled()

		await user.click(button).catch(() => {})
		expect(handleClick).not.toHaveBeenCalled()
	})
})
