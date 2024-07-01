import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'
import { chartOptions, compareStageData, colorOne, labelsOne, handleChartSelect, handleChartUpdate } from '../utils/middleware'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)


const Barchart = () => {
	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selected, setSelected] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Call prepare chart data function
	const chartData = compareStageData(graphData, selected)

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

	return(
		<div style={{ width: '80%', margin: 'auto' }}>
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
			<Bar
				data-testid='barchart'
				width={100} height={100}
				data={newChartData}
				options={chartOptions('Compare Product Global Warming Potential (GWP) of Construction Stages')}
			/>
		</div>
	)
}

export default Barchart