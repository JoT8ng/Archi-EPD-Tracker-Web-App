import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { colorOne, labelsOne } from '../utils/middleware'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Compare Product Global Warming Potential (GWP) of Construction Stages',
		},
		tooltips: {
			mode: 'label',
			intersect: false
		},
	},
}

export const ChartData = {
	labels: labelsOne,
	datasets: [
		{
			label: 'GWP Data',
			data: {
				'A1 to A3': 345,
				'A4': 100,
				'A5': 50,
				'B1': 200,
				'B2': 250,
				'B3': 80,
				'B4': 50,
				'B5': 20,
				'B6': 10,
			},
			backgroundColor: colorOne,
		},
	],
}

export function Showchart() {
	return (
		<div style={{ width: '80%', margin: 'auto' }}>
			<Bar width={1500} height={550} data={ChartData} options={options} />
		</div>
	)
}

export default Showchart