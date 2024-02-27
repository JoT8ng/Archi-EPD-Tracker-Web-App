import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { DataTable } from './TrackerTable'

describe (('Tracker Table'), () => {
	const columns = [
		{ Header: 'Material Category', accessor: 'material_category' },
		{ Header: 'Product Name', accessor: 'product_name' },
		{ Header: 'Material Name', accessor: 'material_name' },
		{ Header: 'Manufacturer', accessor: 'manufacturer' },
		{ Header: 'EPD Declared Unit', accessor: 'declared_unit' },
		{ Header: 'Value 1', accessor: 'value1' },
		{ Header: 'Unit 1', accessor: 'unit1' },
		{ Header: 'Value 2', accessor: 'value2' },
		{ Header: 'Unit 2', accessor: 'unit2' },
		{ Header: 'Volume of Material in Project (m3)', accessor: 'mat_volume' },
		{ Header: 'A1-A3 (GWP) kg C02 -eq', accessor: 'a1to3' },
		{ Header: 'A4 (GWP) kg C02 -eq', accessor: 'a4' },
		{ Header: 'A5 (GWP) kg C02 -eq', accessor: 'a5' },
		{ Header: 'B1 (GWP) kg C02 -eq', accessor: 'b1' },
		{ Header: 'B2 (GWP) kg C02 -eq', accessor: 'b2' },
		{ Header: 'B3 (GWP) kg C02 -eq', accessor: 'b3' },
		{ Header: 'B4 (GWP) kg C02 -eq', accessor: 'b4' },
		{ Header: 'B5 (GWP) kg C02 -eq', accessor: 'b5' },
		{ Header: 'B6 (GWP) kg C02 -eq', accessor: 'b6' },
	]

	const data = [
		{
			'a1to3': 90.0,
			'a4': 10.0,
			'a5': 20.0,
			'b1': 30.0,
			'b2': 40.0,
			'b3': 50.0,
			'b4': 60.0,
			'b5': 70.0,
			'b6': 80.0,
			'declared_unit': 'declared unit',
			'id': 116,
			'manufacturer': 'Wicona',
			'mat_volume': 1000.0,
			'material_category': 'Concrete',
			'material_name': 'test material',
			'product_name': 'Wicline',
			'unit1': 'kg',
			'unit2': 'm2',
			'value1': 2.0,
			'value2': 1.0
		}
	]

	test('Track Table renders with all headers', () => {
		const handleDelete = jest.fn()

		const { getByText } = render(<DataTable columns={columns} data={[]} handleDelete={handleDelete} />)

		expect(getByText('Material Category')).toBeInTheDocument()
		expect(getByText('Product Name')).toBeInTheDocument()
		expect(getByText('Material Name')).toBeInTheDocument()
		expect(getByText('Manufacturer')).toBeInTheDocument()
		expect(getByText('EPD Declared Unit')).toBeInTheDocument()
		expect(getByText('Value 1')).toBeInTheDocument()
		expect(getByText('Unit 1')).toBeInTheDocument()
		expect(getByText('Value 2')).toBeInTheDocument()
		expect(getByText('Unit 2')).toBeInTheDocument()
		expect(getByText('Volume of Material in Project (m3)')).toBeInTheDocument()
		expect(getByText('A1-A3 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('A4 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('A5 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B1 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B2 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B3 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B4 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B5 (GWP) kg C02 -eq')).toBeInTheDocument()
		expect(getByText('B6 (GWP) kg C02 -eq')).toBeInTheDocument()
	})

	test('table renders with data', () => {
		const handleDelete = jest.fn()

		const { getByText } = render(<DataTable columns={columns} data={data} handleDelete={handleDelete} />)

		expect(getByText('Concrete')).toBeInTheDocument()
		expect(getByText('declared unit')).toBeInTheDocument()
		expect(getByText('Wicona')).toBeInTheDocument()
		expect(getByText('1000')).toBeInTheDocument()
		expect(getByText('test material')).toBeInTheDocument()
		expect(getByText('Wicline')).toBeInTheDocument()
		expect(getByText('90')).toBeInTheDocument()
		expect(getByText('1')).toBeInTheDocument()
		expect(getByText('2')).toBeInTheDocument()
		expect(getByText('10')).toBeInTheDocument()
		expect(getByText('20')).toBeInTheDocument()
		expect(getByText('30')).toBeInTheDocument()
		expect(getByText('40')).toBeInTheDocument()
		expect(getByText('50')).toBeInTheDocument()
		expect(getByText('60')).toBeInTheDocument()
		expect(getByText('70')).toBeInTheDocument()
		expect(getByText('80')).toBeInTheDocument()
		expect(getByText('kg')).toBeInTheDocument()
		expect(getByText('m2')).toBeInTheDocument()
	})

	test('delete button can be clicked', async () => {
		const user = userEvent.setup()
		const handleDelete = jest.fn()

		const { getByText } = render(<DataTable columns={columns} data={data} handleDelete={handleDelete} />)

		const button = getByText('Delete')
		await user.click(button)
		expect(handleDelete.mock.calls).toHaveLength(1)
	})
})