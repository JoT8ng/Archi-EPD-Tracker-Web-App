import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import './tracker.css';
import Barchart from '../components/barchart';

const TableTracker = ({data}) => {
    return (
        <tr>
            <td>{data.material_category}</td>
            <td>{data.product_name}</td>
            <td>{data.material_name}</td>
            <td>{data.manufacturer}</td>
            <td>{data.declared_unit}</td>
            <td>{data.value1}</td>
            <td>{data.unit1}</td>
            <td>{data.value2}</td>
            <td>{data.unit2}</td>
            <td>{data.mat_volume}</td>
            <td>{data.a1to3}</td>
            <td>{data.a4}</td>
            <td>{data.a5}</td>
            <td>{data.b1}</td>
            <td>{data.b2}</td>
            <td>{data.b3}</td>
            <td>{data.b4}</td>
            <td>{data.b5}</td>
            <td>{data.b6}</td>
        </tr>
    )
}

const Tracker = () => {

    // Code to handle form submission and send data to backend Flask database
    const handleSubmit = (event) => {
        // Prevent default form submission behaviour
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);

        // Make POST request to backend Flask API
        fetch('/tracker', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    // Function to send request to backend server to clear session data once web app or browser is closed
    const clearSession = () => {
        fetch('/clearsession', {
            method: 'POST'
        })
        .then(response => {
            console.log('Session data deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting session data:', error);
        })
    }

    // useEffect to add 'beforeunload' event listener
    useEffect(() => {
        const handleBeforeUnload = () => {
            clearSession();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean event listener when component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [])

    // Fetch backend database data
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('/tracker')
        .then(response=>response.json())
        .then(data => setTableData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [])

    return (
        <div className='page-container'>
            <h1>Input EPD Data</h1>
            <hr />
            <form action='/tracker' method='post' onSubmit={handleSubmit}>
                <div class='input1'>
                    <h3>Material Category</h3>
                    <select id="material_category" name="material_category">
                        <option value="Concrete">Concrete</option>
                        <option value="Wood">Wood</option>
                        <option value="Brick">Brick</option>
                        <option value="Glass">Glass</option>
                        <option value="Steel">Steel</option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Other_Metals">Other Metals</option>
                        <option value="Stone">Stone</option>
                        <option value="Ceramics">Ceramics</option>
                        <option value="Plaster">Plaster</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Insulation">Insulation</option>
                        <option value="Waterproofing">Waterproofing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class='input2'>
                    <h3>Product Name</h3>
                    <input id='product_name' name='product_name' type='text' placeholder='Name' required></input>
                    <h3>Material Name</h3>
                    <input id='material_name' name='material_name' type='text' placeholder='Name' required></input>
                </div>
                <div class='input3'>
                    <h3>Manufacturer</h3>
                    <input id='manufacturer' name='manufacturer' type='text' placeholder='Manufacturer' required></input>
                </div>
                <div class='input4'>
                    <h1>Global Warming Potential &#40;GWP&#41; kg C02 -eq</h1>
                </div>
                <div class='input5'>
                    <h3>EPD Declared Unit</h3>
                    <h3>Declared Unit</h3>
                    <input id='declared_unit' name='declared_unit' type='text' placeholder='eg. one ton of cold rolled stainless steel' required></input>
                    <h3>Value 1</h3>
                    <input id='value1' name='value1' type='number' placeholder='Number Value' required></input>
                    <h3>Unit 1</h3>
                    <select id="unit1" name="unit1">
                        <option value="kg">kg</option>
                        <option value="m2">m2</option>
                    </select>
                    <h3>Value 2</h3>
                    <input id='value2' name='value2' type='number' placeholder='Number Value' required></input>
                    <h3>Unit 2</h3>
                    <select id="unit2" name="unit2">
                        <option value="kg">kg</option>
                        <option value="m2">m2</option>
                    </select>
                </div>
                <div class='input6'>
                    <h3>Volume of Material in Project &#40;m3&#41;</h3>
                    <input id='mat_volume' name='mat_volume' type='number' placeholder='Volume' required></input>
                </div>
                <div class='input7'>
                    <h3>A1-A3</h3>
                    <input id='a1to3' name='a1to3' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input8'>
                    <h3>A4</h3>
                    <input id='a4' name='a4' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input9'>
                    <h3>A5</h3>
                    <input id='a5' name='a5' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input10'>
                    <h3>B1</h3>
                    <input id='b1' name='b1' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input11'>
                    <h3>B2</h3>
                    <input id='b2' name='b2' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input12'>
                    <h3>B3</h3>
                    <input id='b3' name='b3' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input13'>
                    <h3>B4</h3>
                    <input id='b4' name='b4' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input14'>
                    <h3>B5</h3>
                    <input id='b5' name='b5' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input15'>
                    <h3>B6</h3>
                    <input id='b6' name='b6' type='number' placeholder='GWP' required></input>
                </div>
                <div class='input16'>
                    <button class='button' type='submit'>Add</button>
                </div>
            </form>

            <hr />

            <h1>Data Table</h1>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Material Category</th>
                            <th>Product Name</th>
                            <th>Material Name</th>
                            <th>Manufacturer</th>
                            <th>EPD Declared Unit</th>
                            <th>Value 1</th>
                            <th>Unit 1</th>
                            <th>Value 2</th>
                            <th>Unit 2</th>
                            <th>Volume of Material in Project &#40;m3&#41;</th>
                            <th>A1-A3 &#40;GWP&#41; kg C02 -eq</th>
                            <th>A4 &#40;GWP&#41; kg C02 -eq</th>
                            <th>A5 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B1 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B2 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B3 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B4 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B5 &#40;GWP&#41; kg C02 -eq</th>
                            <th>B6 &#40;GWP&#41; kg C02 -eq</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tableData.map((rowData) => (
                                <TableTracker key={rowData.id} data={rowData} />
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <hr />

            <h1>Create Graphs</h1>
            <div className='overallchart-container'>
                <div className='barchart-container'>
                    <Barchart />
                </div>
            </div>
        </div>
    );
}

export default Tracker;