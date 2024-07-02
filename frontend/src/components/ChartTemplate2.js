import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Legend, Tooltip } from 'chart.js'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'
import { Bar, Pie } from 'react-chartjs-2'
import { chartOptions, handleChartSelect, handleChartUpdate } from '../utils/middleware'

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)

const ChartTemplateTwo = ({ containerWidth, chartWidth, chartHeight, type }) => {
	const ChartComponent = type === 'bar' ? Bar : Pie

	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selected, setSelected] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Generate random colors function
	const dynamicColors = () => {
		const r = Math.floor(Math.random() * 255)
		const g = Math.floor(Math.random() * 255)
		const b = Math.floor(Math.random() * 255)
		return `rgba(${r}, ${g}, ${b}, 0.6)`
	}

	// List of specific keys to be shown as options
	const specificKeys = ['a1to3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6']

	// Get the available column keys from the first item in the data array
	const columnKeys = graphData.length > 0 ? Object.keys(graphData[0]) : []

	// Filter columnKeys based on the specificKeys array
	const filteredKeys = columnKeys.filter(key => specificKeys.includes(key))

	// Format the data for the bar chart based on product name selection
	const compareProductData = () => {
		// Only continue with function if graphData is not null
		if (!graphData || graphData.length === 0 || !selected) return null

		// Filter backend graphData based on selected construction stage
		const filteredData = graphData.filter(item => item[selected])

		// Extract values for the selected construction stage
		const chartData = filteredData.map(item => ({
			label: item.product_name,
			value: item[selected],
			backgroundColor: dynamicColors(),
		}))

		return chartData
	}

	// Call prepare chart data function
	const newchartData = compareProductData()

	const newChartData = {
		labels: newchartData ? newchartData.map(item => item.label) : [],
		datasets: [
			{
				label: `GWP Data for ${selected}`,
				data: newchartData ? newchartData.map(item => item.value) : [],
				backgroundColor: newchartData ? newchartData.map(item => item.backgroundColor) : [],
			},
		],
	}

	return (
		<div style={{ width: `${containerWidth}%`, margin: 'auto' }}>
			<div className='input3'>
				<button id='barchart-refresh' className='button' onClick={() => handleChartUpdate(sessionID, setGraphData)}>Refresh Chart</button>
			</div>
			<div className='input-container'>
				<label>Select Construction Stage</label>
				<select onChange={(e) => handleChartSelect(e, setSelected)} value={selected}>
					<option value="">Construction Stage</option>
					{filteredKeys.map(key => (
						<option key={key} value={key}>{key}</option>
					))}
				</select>
			</div>
			<ChartComponent
				data-testid='charttwo'
				width={chartWidth}
				height={chartHeight}
				data={newChartData}
				options={chartOptions('Compare Global Warming Potentials (GWP) of Different Products')}
			/>
		</div>
	)
}

export default ChartTemplateTwo