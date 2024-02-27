import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Barchart from './barchart'
import trackerService from '../services/TrackerServices'
import Barcharttwo from './barchart2'
import Piechart from './piechart'
import Piecharttwo from './piechart2'

jest.mock('../services/TrackerServices')

describe(('Barchart Tests'), () => {
	beforeEach(() => {
		trackerService.getAll.mockResolvedValue([
			{
				product_name: 'Product 1',
				a1to3: 10,
				a4: 20,
				a5: 30,
				b1: 40,
				b2: 50,
				b3: 60,
				b4: 70,
				b5: 80,
				b6: 90
			}
		])
	})

	test('barchart.js renders data', async () => {
		const { getByTestId } = render(<Barchart />)
		const barChartElement = getByTestId('barchart')
		expect(barChartElement).toBeInTheDocument()
	})

	test('barchart2.js renders data', async () => {
		const { getByTestId } = render(<Barcharttwo />)
		const barChartElement = getByTestId('barchart')
		expect(barChartElement).toBeInTheDocument()
	})
})

describe(('Piechart Tests'), () => {
	beforeEach(() => {
		trackerService.getAll.mockResolvedValue([
			{
				product_name: 'Product 1',
				a1to3: 10,
				a4: 20,
				a5: 30,
				b1: 40,
				b2: 50,
				b3: 60,
				b4: 70,
				b5: 80,
				b6: 90
			}
		])
	})

	test('pichart.js renders data', async () => {
		const { getByTestId } = render(<Piechart />)
		const barChartElement = getByTestId('piechart')
		expect(barChartElement).toBeInTheDocument()
	})

	test('piechart2.js renders data', async () => {
		const { getByTestId } = render(<Piecharttwo />)
		const barChartElement = getByTestId('piechart')
		expect(barChartElement).toBeInTheDocument()
	})
})