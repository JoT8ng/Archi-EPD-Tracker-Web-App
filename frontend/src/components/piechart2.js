import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Title, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import trackerService from '../services/TrackerServices'
import { chartOptions, getColumnKeys, getFilteredKeys, compareProductData, handleChartSelect, handleChartUpdate } from '../utils/middleware'

ChartJS.register(
	ArcElement,
	Title,
	Legend,
	Tooltip
)

const Piecharttwo = () => {
	const sessionID = useSessionContext()
	const [graphData, setGraphData] = useState([])
	const [selected, setSelected] = useState('')

	useEffect(() => {
		trackerService.getAll(sessionID).then(data => setGraphData(data))
			.catch(error => console.error('Error fetching data:', error))
	}, [sessionID])

	// Get the available column keys from the first item in the data array
	const columnKeys = getColumnKeys(graphData)

	// Filter columnKeys based on the specificKeys array
	const filteredKeys = getFilteredKeys(columnKeys)

	// Call prepare chart data function
	const newchartData = compareProductData(graphData, selected)

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

	return(
		<div style={{ width: '50%', margin: 'auto' }}>
			<div className='input3'>
				<button className='button' onClick={() => handleChartUpdate(sessionID, setGraphData)}>Refresh Chart</button>
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
			<Pie
				data-testid='piechart'
				width={400}
				height={400}
				data={newChartData}
				options={chartOptions('Compare Global Warming Potentials (GWP) of Different Products')}
			/>
		</div>
	)
}

export default Piecharttwo