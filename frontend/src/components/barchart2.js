import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'
import { chartOptions, getColumnKeys, getFilteredKeys, compareProductData } from '../utils/middleware'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)

const Barcharttwo = () => {
	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selectedStage, setSelectedStage] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Get the available column keys from the first item in the data array
	const columnKeys = getColumnKeys(graphData)

	// Filter columnKeys based on the specificKeys array
	const filteredKeys = getFilteredKeys(columnKeys)

	// Call prepare chart data function
	const newchartData = compareProductData(graphData, selectedStage)

	const newChartData = {
		labels: newchartData ? newchartData.map(item => item.label) : [],
		datasets: [
			{
				label: `GWP Data for ${selectedStage}`,
				data: newchartData ? newchartData.map(item => item.value) : [],
				backgroundColor: newchartData ? newchartData.map(item => item.backgroundColor) : [],
			},
		],
	}

	// Handle product name selection
	const handleStageSelect = event => {
		setSelectedStage(event.target.value)
	}

	// Handle Update
	const handleUpdate = async () => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}

	return(
		<div style={{ width: '80%', margin: 'auto' }}>
			<div className='input3'>
				<button className='button' onClick={handleUpdate}>Refresh Chart</button>
			</div>
			<div className='input-container'>
				<label>Select Construction Stage</label>
				<select onChange={handleStageSelect} value={selectedStage}>
					<option value="">Construction Stage</option>
					{filteredKeys.map(key => (
						<option key={key} value={key}>{key}</option>
					))}
				</select>
			</div>
			<Bar
				data-testid='barchart'
				width={700}
				height={700}
				data={newChartData}
				options={chartOptions('Compare Global Warming Potentials (GWP) of Different Products')}
			/>
		</div>
	)
}

export default Barcharttwo