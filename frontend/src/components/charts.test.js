import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import trackerService from '../services/TrackerServices'
import ChartTemplate from './ChartTemplate'
import ChartTemplateTwo from './ChartTemplate2'

jest.mock('../services/TrackerServices')

describe(('ChartTemplate Tests'), () => {
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

	test('ChartTemplate renders barchart', async () => {
		const { getByTestId } = render(
			<ChartTemplate
				type='bar'
				containerWidth={80}
				chartWidth={100}
				chartHeight={100}
			/>
		)
		const ChartElement = getByTestId('chartone')
		expect(ChartElement).toBeInTheDocument()
	})

	test('ChartTemplate renders piechart', async () => {
		const { getByTestId } = render(
			<ChartTemplate
				type='pie'
				containerWidth={50}
				chartWidth={400}
				chartHeight={400}
			/>
		)
		const ChartElement = getByTestId('chartone')
		expect(ChartElement).toBeInTheDocument()
	})
})

describe(('ChartTemplateTwo Tests'), () => {
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
		const { getByTestId } = render(
			<ChartTemplateTwo
				type='bar'
				containerWidth={80}
				chartWidth={700}
				chartHeight={700}
			/>
		)
		const ChartElement = getByTestId('charttwo')
		expect(ChartElement).toBeInTheDocument()
	})

	test('piechart2.js renders data', async () => {
		const { getByTestId } = render(
			<ChartTemplateTwo
				type='pie'
				containerWidth={50}
				chartWidth={400}
				chartHeight={400}
			/>
		)
		const ChartElement = getByTestId('charttwo')
		expect(ChartElement).toBeInTheDocument()
	})
})