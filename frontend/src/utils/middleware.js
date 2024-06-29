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

// Format the data for the GWP stage comparison charts based on product name selection
const compareStageData = (graphData, selectedProduct) => {
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

module.exports = {
	chartOptions,
	compareStageData,
	colorOne,
	labelsOne
}