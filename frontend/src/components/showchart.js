import React from 'react';
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
            text: 'Compare Product Global Warming Potential (GWP) of Construction Stages',
        },
        tooltips: {
            mode: 'label',
            intersect: false
        },
    },
  };

const labels = ['A1 to A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6'];

export const ChartData = {
    labels,
    datasets: [
        {
            label: 'A1 to A3',
            data: labels.map(label => label === 'A1 to A3' ? 345 : 0),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'A4',
            data: labels.map(label => label === 'A4' ? 100 : 0),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: 'A5',
            data: labels.map(label => label === 'A5' ? 50 : 0),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
            label: 'B1',
            data: labels.map(label => label === 'B1' ? 200 : 0),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
        },
        {
            label: 'B2',
            data: labels.map(label => label === 'B2' ? 250 : 0),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'B3',
            data: labels.map(label => label === 'B3' ? 80 : 0),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
            label: 'B4',
            data: labels.map(label => label === 'B4' ? 50 : 0),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
        {
            label: 'B5',
            data: labels.map(label => label === 'B5' ? 20 : 0),
            backgroundColor: 'rgba(153, 150, 255, 0.2)',
        },
        {
            label: 'B6',
            data: labels.map(label => label === 'B6' ? 10 : 0),
            backgroundColor: 'rgba(255, 180, 64, 0.2)',
        },
    ],
};

export function Showchart() {
    return (
        <div style={{ width: '100%', margin: 'auto', paddingTop: '25px' }}>
            <Bar width={750} height={350} data={ChartData} options={options} />
        </div>
    );
}

export default Showchart;