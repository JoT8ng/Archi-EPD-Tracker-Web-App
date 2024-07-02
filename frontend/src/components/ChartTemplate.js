import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, Title, Legend, Tooltip } from 'chart.js'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'
import { Bar, Pie } from 'react-chartjs-2'
import { chartOptions, colorOne, labelsOne, handleChartSelect, handleChartUpdate } from '../utils/middleware'

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)

const ChartTemplate = ({ containerWidth, chartWidth, chartHeight, type }) => {
	const ChartComponent = type === 'bar' ? Bar : Pie

	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selected, setSelected] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Format the data for the GWP stage comparison charts based on product name selection
	const compareStageData = () => {
		// Only continue with function if graphData is not null
		if (!graphData || graphData.length === 0) return null

		// Filter backend graphData based on selected product name
		const filteredData = graphData.filter(item => {
			return item.product_name && item.product_name === selected
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
	const chartData = compareStageData()

	const newChartData = {
		labels: labelsOne,
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
				backgroundColor: colorOne,
			},
		],
	}

	return (
		<div style={{ width: `${containerWidth}%`, margin: 'auto' }}>
			<div className='input3'>
				<button id='barchart-refresh' className='button' onClick={() => handleChartUpdate(sessionID, setGraphData)}>Refresh Chart</button>
			</div>
			<div className='input-container'>
				<label>Select Product</label>
				<select id='barchart-select' onChange={(e) => handleChartSelect(e, setSelected)} value={selected}>
					<option value="">Product Name</option>
					{Array.from(new Set(graphData.map(item => item.product_name))).map((product, index) => (
						<option key={index} value={product}>
							{product}
						</option>
					))}
				</select>
			</div>
			<ChartComponent
				data-testid='chartone'
				width={chartWidth}
				height={chartHeight}
				data={newChartData}
				options={chartOptions('Compare Product Global Warming Potential (GWP) of Construction Stages')}
			/>
		</div>
	)
}

export default ChartTemplate