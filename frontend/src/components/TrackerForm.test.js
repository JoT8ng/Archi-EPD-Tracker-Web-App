import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import TrackerForm from './TrackerForm'
import { useSessionContext } from '../context'

jest.mock('../context', () => ({
	useSessionContext: jest.fn()
}))

describe (('Tracker Form'), () => {
	beforeEach(() => {
		useSessionContext.mockReturnValue('mock-session-id')
	})

	test('Track Form renders with all inputs', () => {
		const handleSubmit = jest.fn()

		const { getByText } = render(<TrackerForm handleSubmit={handleSubmit} />)

		expect(getByText('Input EPD Data')).toBeInTheDocument()
		expect(getByText('Material Category')).toBeInTheDocument()
		expect(getByText('Product Name')).toBeInTheDocument()
		expect(getByText('Material Name')).toBeInTheDocument()
		expect(getByText('Manufacturer')).toBeInTheDocument()
		expect(getByText('Declared Unit')).toBeInTheDocument()
		expect(getByText('Value 1')).toBeInTheDocument()
		expect(getByText('Unit 1')).toBeInTheDocument()
		expect(getByText('Value 2')).toBeInTheDocument()
		expect(getByText('Unit 2')).toBeInTheDocument()
		expect(getByText('Volume of Material in Project (m3)')).toBeInTheDocument()
		expect(getByText('A1-A3')).toBeInTheDocument()
		expect(getByText('A4')).toBeInTheDocument()
		expect(getByText('A5')).toBeInTheDocument()
		expect(getByText('B1')).toBeInTheDocument()
		expect(getByText('B2')).toBeInTheDocument()
		expect(getByText('B3')).toBeInTheDocument()
		expect(getByText('B4')).toBeInTheDocument()
		expect(getByText('B5')).toBeInTheDocument()
		expect(getByText('B6')).toBeInTheDocument()
		expect(getByText('Add')).toBeInTheDocument()
	})

	test.skip('Tracker Form calls handleSubmit', async () => {
		const mockHandleSubmit = jest.fn()
		const user = userEvent.setup()

		const { getByText, getByLabelText } = render(<TrackerForm handleSubmit={mockHandleSubmit} />)

		const inputMaterialCategory = getByLabelText('Material Category')
		const inputProductName = getByText('Product Name')
		const inputMaterialName = getByText('Material Name')
		const inputManufacturer = getByText('Manufacturer')
		const inputDeclaredUnit = getByText('Declared Unit')
		const inputValue1 = getByText('Value 1')
		const inputUnit1 = getByLabelText('Unit 1')
		const inputValue2 = getByText('Value 2')
		const inputUnit2 = getByLabelText('Unit 2')
		const inputVolume = getByText('Volume of Material in Project (m3)')
		const inputA13 = getByText('A1-A3')
		const inputA4 = getByText('A4')
		const inputA5 = getByText('A5')
		const inputB1 = getByText('B1')
		const inputB2 = getByText('B2')
		const inputB3 = getByText('B3')
		const inputB4 = getByText('B4')
		const inputB5 = getByText('B5')
		const inputB6 = getByText('B6')

		await user.selectOptions(inputMaterialCategory, 'Concrete')
		await user.type(inputProductName, 'Wicline Evo')
		await user.type(inputMaterialName, 'Aluminum Frame')
		await user.type(inputManufacturer, 'Wicona')
		await user.type(inputDeclaredUnit, 'one m2 of aluminum frame')
		await user.type(inputValue1, '1')
		await user.type(inputValue2, '1')
		await user.selectOptions(inputUnit1, 'm2')
		await user.selectOptions(inputUnit2, 'kg')
		await user.type(inputVolume, '1000')
		await user.type(inputA13, '100')
		await user.type(inputA4, '100')
		await user.type(inputA5, '100')
		await user.type(inputB1, '100')
		await user.type(inputB2, '100')
		await user.type(inputB3, '100')
		await user.type(inputB4, '100')
		await user.type(inputB5, '100')
		await user.type(inputB6, '100')

		const formData = new FormData()
		formData.append('session_id', 'mock-session-id')

		screen.queryByTestId('trackerform').onsubmit = mockHandleSubmit
		const button = screen.getByRole('button', { name: 'Add' })
		await waitFor(() => {
			user.click(button)
			expect(mockHandleSubmit).toHaveBeenCalled()
			expect(mockHandleSubmit.mock.calls[0][0].inputMaterialCategory).toBe('Concrete')
		})
	})
})