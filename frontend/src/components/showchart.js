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
    maintainAspectRatio: false,
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
            label: 'GWP Data',
            data: {
                'A1 to A3': 345,
                'A4': 100,
                'A5': 50,
                'B1': 200,
                'B2': 250,
                'B3': 80,
                'B4': 50,
                'B5': 20,
                'B6': 10,
            },
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 150, 255, 0.2)',
                'rgba(255, 180, 64, 0.2)',
            ],
        },
    ],
};

export function Showchart() {
    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <Bar width={1500} height={550} data={ChartData} options={options} />
        </div>
    );
}

export default Showchart;