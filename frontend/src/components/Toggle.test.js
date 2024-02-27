import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggle from './Toggle'

describe(('Toggle button'), () => {
	test('Toggle button defaults to ChevronDown symbol', async () => {
		const container = render(
			<Toggle
				isToggled={false}
				onClick={() => {}}
			/>
		)

		const toggleButton = container.queryByTestId('toggle-icon')
		expect(toggleButton).toHaveAttribute('data-icon', 'ChevronDownIcon')
	})

	test('Toggle button shows ChevronUp symbol when clicked', async () => {
		const container = render(
			<Toggle
				isToggled={true}
				onClick={() => {}}
			/>
		)

		const toggleButton = container.queryByTestId('toggle-icon')
		expect(toggleButton).toHaveAttribute('data-icon', 'ChevronUpIcon')
	})

	test('Toggle onClick calls', async () => {
		const user = userEvent.setup()
		const onClickMock = jest.fn()

		const container = render(
			<Toggle
				isToggled={true}
				onClick={onClickMock}
			/>
		)

		const toggleButton = container.queryByTestId('toggle-icon')
		await user.click(toggleButton)
		expect(onClickMock.mock.calls).toHaveLength(1)
	})
})