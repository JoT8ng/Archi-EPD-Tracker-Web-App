import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,    
    Legend,
    Tooltip
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Compare Global Warming Potentials (GWP) of Different Products',
      },
      tooltips: {
        mode: 'label',
        intersect: false
      },
    },
  };

const Barcharttwo = () => {
    // Fetch backend database data
    const [graphData, setGraphData] = useState([]);
    const [selectedStage, setSelectedStage] = useState('');

    // List of specific keys to be shown as options
    const specificKeys = ['a1to3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];

    // Get the available column keys from the first item in the data array
    const columnKeys = graphData.length > 0 ? Object.keys(graphData[0]) : [];

    // Filter columnKeys based on the specificKeys array
    const filteredKeys = columnKeys.filter(key => specificKeys.includes(key));

    useEffect(() => {
        fetch('/tracker')
        .then(response=>response.json())
        .then(data => setGraphData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [])

    // Format the data for the bar chart based on product name selection
    const prepareChartData = () => {
        // Only continue with function if graphData is not null
        if (!graphData || graphData.length === 0 || !selectedStage) return null;

        // Filter backend graphData based on selected construction stage
        const filteredData = graphData.filter(item => item[selectedStage]);

        // Extract values for the selected construction stage
        const chartData = filteredData.map(item => item[selectedStage]);

        return chartData;
    };

    // Call prepare chart data function
    const newchartData = prepareChartData();

    const newChartData = {
        labels: graphData.map(item => item.product_name),
            datasets: [
                {
                label: `GWP Data for ${selectedStage}`,
                data: newchartData || [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
    };   

    // Handle product name selection
    const handleStageSelect = event => {
        setSelectedStage(event.target.value);
    };
    
    return(
        <div style={{ width: '80%', height: '700px', margin: 'auto' }}>
            <label>Select Construction Stage</label>
            <select onChange={handleStageSelect} value={selectedStage}>
                <option value="">Construction Stage</option>
                {filteredKeys.map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <Bar width={1500} height={700} data={newChartData} options={options} />
        </div>
    );
}

export default Barcharttwo;