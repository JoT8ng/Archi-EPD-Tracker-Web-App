import trackerService from '../services/TrackerServices'

// Charts middleware functions

const chartOptions = (title) => ({
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: title,
		},
		tooltips: {
			mode: 'label',
			intersect: false
		},
	},
})

const colorOne = [
	'rgba(75, 192, 192, 0.2)',
	'rgba(255, 99, 132, 0.2)',
	'rgba(54, 162, 235, 0.2)',
	'rgba(255, 206, 86, 0.2)',
	'rgba(75, 192, 192, 0.2)',
	'rgba(153, 102, 255, 0.2)',
	'rgba(255, 159, 64, 0.2)',
	'rgba(153, 150, 255, 0.2)',
	'rgba(255, 180, 64, 0.2)',
]

const labelsOne = ['A1 to A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6']

// Handle product name selection
const handleChartSelect = (event, setSelected) => {
	setSelected(event.target.value)
}

// Handle Update
const handleChartUpdate = async (sessionID, setGraphData) => {
	try {
		const data = await trackerService.getAll(sessionID)
		setGraphData(data)
	} catch (error) {
		console.error('Error fetching data', error)
	}
}

export {
	chartOptions,
	colorOne,
	labelsOne,
	handleChartSelect,
	handleChartUpdate
}