import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Title, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
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

const Piecharttwo = ({ graphData, fetchGraphData }) => {
    // Fetch backend database data
    const [selectedStage, setSelectedStage] = useState('');

    // Generate random colors function
    const dynamicColors = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };

    // List of specific keys to be shown as options
    const specificKeys = ['a1to3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];

    // Get the available column keys from the first item in the data array
    const columnKeys = graphData.length > 0 ? Object.keys(graphData[0]) : [];

    // Filter columnKeys based on the specificKeys array
    const filteredKeys = columnKeys.filter(key => specificKeys.includes(key));

    useEffect(() => {
        if (!graphData || graphData.length === 0) {
            fetchGraphData();
        }
    }, [graphData, fetchGraphData])

    // Format the data for the bar chart based on product name selection
    const prepareChartData = () => {
        // Only continue with function if graphData is not null
        if (!graphData || graphData.length === 0 || !selectedStage) return null;

        // Filter backend graphData based on selected construction stage
        const filteredData = graphData.filter(item => item[selectedStage]);

        // Extract values for the selected construction stage
        const chartData = filteredData.map(item => ({
            label: item.product_name,
            value: item[selectedStage],
            backgroundColor: dynamicColors(),
        }));

        return chartData;
    };

    // Call prepare chart data function
    const newchartData = prepareChartData();

    const newChartData = {
        labels: newchartData ? newchartData.map(item => item.label) : [],
            datasets: [
                {
                label: `GWP Data for ${selectedStage}`,
                data: newchartData ? newchartData.map(item => item.value) : [],
                backgroundColor: newchartData ? newchartData.map(item => item.backgroundColor) : [],
                },
            ],
    };   

    // Handle product name selection
    const handleStageSelect = event => {
        setSelectedStage(event.target.value);
    };
    
    return(
        <div style={{ width: '80%', height: '500px', margin: 'auto' }}>
            <label>Select Construction Stage</label>
            <select onChange={handleStageSelect} value={selectedStage}>
                <option value="">Construction Stage</option>
                {filteredKeys.map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <Pie width={400} height={400} data={newChartData} options={options} />
        </div>
    );
}

export default Piecharttwo;