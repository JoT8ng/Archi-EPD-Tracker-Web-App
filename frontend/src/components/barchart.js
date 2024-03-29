import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'

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

const Barchart = () => {
	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selectedProduct, setSelectedProduct] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Format the data for the bar chart based on product name selection
	const prepareChartData = () => {
		// Only continue with function if graphData is not null
		if (!graphData || graphData.length === 0) return null

		// Filter backend graphData based on selected product name
		const filteredData = graphData.filter(item => {
			return item.product_name && item.product_name === selectedProduct
		})

		// Extract values for the chart
		const a1to3 = filteredData.map(item => item.a1to3)
		const a4 = filteredData.map(item => item.a4)
		const a5 = filteredData.map(item => item.a5)
		const b1 = filteredData.map(item => item.b1)
		const b2 = filteredData.map(item => item.b2)
		const b3 = filteredData.map(item => item.b3)
		const b4 = filteredData.map(item => item.b4)
		const b5 = filteredData.map(item => item.b5)
		const b6 = filteredData.map(item => item.b6)

		return {
			a1to3,
			a4,
			a5,
			b1,
			b2,
			b3,
			b4,
			b5,
			b6,
		}
	}

	// Call prepare chart data function
	const chartData = prepareChartData()

	const newChartData = {
		labels: ['A1 to A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
		datasets: [
			{
				label: 'GWP Data',
				data: chartData
					? [
						chartData.a1to3,
						chartData.a4,
						chartData.a5,
						chartData.b1,
						chartData.b2,
						chartData.b3,
						chartData.b4,
						chartData.b5,
						chartData.b6,
					]
					: [],
				backgroundColor: [
					'rgba(75, 192, 192, 0.2)',
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(153, 150, 255, 0.2)',
					'rgba(255, 180, 64, 0.2)',
				],
			},
		],
	}

	// Handle product name selection
	const handleProductSelect = event => {
		setSelectedProduct(event.target.value)
	}

	// Handle Update
	const handleUpdate = async () => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}

	return(
		<div style={{ width: '80%', margin: 'auto' }}>
			<div className='input3'>
				<button id='barchart-refresh' className='button' onClick={handleUpdate}>Refresh Chart</button>
			</div>
			<div className='input-container'>
				<label>Select Product</label>
				<select id='barchart-select' onChange={handleProductSelect} value={selectedProduct}>
					<option value="">Product Name</option>
					{Array.from(new Set(graphData.map(item => item.product_name))).map((product, index) => (
						<option key={index} value={product}>
							{product}
						</option>
					))}
				</select>
			</div>
			<Bar data-testid='barchart' width={100} height={100} data={newChartData} options={options} />
		</div>
	)
}

export default Barchart