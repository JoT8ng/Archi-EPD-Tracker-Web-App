import React, { useEffect, useState, useRef } from 'react';
import fetch from 'node-fetch';
import { Chart } from 'chart.js/auto';

const Barchart = () => {
    // Fetch backend database data
    const [graphData, setGraphData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        fetch('/tracker')
        .then(response=>response.json())
        .then(data => setGraphData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [])

    // Add a reference to the chart canvas element
    const chartRef = useRef(null);

    // Format the data for the bar chart based on product name selection
    const prepareChartData = () => {
        // Only continue with function if graphData is not null
        if (!graphData || graphData.length === 0) return null;

       // Filter backend graphData based on selected product name
        const filteredData = graphData.filter(item => {
            return item.product_name && item.product_name === selectedProduct;
        });

        // Extract values for the chart
        const a1to3 = filteredData.map(item => item.a1to3);
        const a4 = filteredData.map(item => item.a4);
        const a5 = filteredData.map(item => item.a5);
        const b1 = filteredData.map(item => item.b1);
        const b2 = filteredData.map(item => item.b2);
        const b3 = filteredData.map(item => item.b3);
        const b4 = filteredData.map(item => item.b4);
        const b5 = filteredData.map(item => item.b5);
        const b6 = filteredData.map(item => item.b6);

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
        };
    }

    // Create and update the chart inside this useEffect hook
    useEffect (() => {
        if (!chartRef.current || !selectedProduct) return;

        // Call prepare chart data function
        const chartData = prepareChartData();

        // Destroy existing chart if it exists
        if (chartInstance) {
            chartInstance.destroy();
        }

        const NewchartInstance = new Chart(chartRef.current, {
            type: 'bar',
            data: [
                {
                    label: 'A1 to A3',
                    data: chartData.a1to3,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'A4',
                    data: chartData.a4,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'A5',
                    data: chartData.a5,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B1',
                    data: chartData.b1,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B2',
                    data: chartData.b2,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B3',
                    data: chartData.b3,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B4',
                    data: chartData.b4,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B5',
                    data: chartData.b5,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'B6',
                    data: chartData.b6,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }
            ]
        })

        setChartInstance(NewchartInstance);

    }, [graphData, selectedProduct]);

    // Handle product name selection
    const handleProductSelect = event => {
        setSelectedProduct(event.target.value);
    };
    
    return(
        <div>
            <label>Select Product</label>
            <select onChange={handleProductSelect} value={selectedProduct}>
                <option value="">Product Name</option>
                {Array.from(new Set(graphData.map(item => item.product_name))).map((product, index) => (
                <option key={index} value={product}>
                    {product}
                </option>
                ))}
            </select>
            <canvas id='barChart' ref={chartRef} className='barchart' width='800px' height='800px'/>
        </div>
    );
}

export default Barchart;