import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import fetch from 'node-fetch';
import './tracker.css';
import Barchart from '../components/barchart';
import Piechart from '../components/piechart';
import Barcharttwo from '../components/barchart2';
import Piecharttwo from '../components/piechart2';


// Create React Table
const DataTable = ({ columns, data, handleDelete }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    return (
        <table {...getTableProps()} className='react-table'>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    <th>Edit</th>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row);
                return (
                <tr {...row.getRowProps()}>
                    <td>
                        <button onClick={() => handleDelete(row)}>Delete</button>
                    </td>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                </tr>
                );
                })}
            </tbody>
        </table>
    );
  };  

const Tracker = () => {
    // Code to handle form submission and send data to backend Flask database
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        // Prevent default form submission behaviour
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);

        // Make POST request to backend Flask API
        fetch(`/tracker`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                // Handle the error message received from the backend
                console.error('Error:', data.error);
                // Display the error message to the user
                // Update error message state
                setErrorMessage(data.error);
            } else {
                // Clear error message state
                setErrorMessage('');
                // Fetch updated backend data
                fetchBackendData();
                // Clear form inputs after successful data submission to backend
                event.target.reset();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    // Function to send request to backend server to clear session data once web app or browser is closed
    const clearSession = async () => {      
        fetch(`/clearsession`, {
            method: 'POST',
        })
        .then(response => {
            console.log('Session data deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting session data:', error);
        })
    }

    // useEffect to add 'beforeunload' event listener
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // Fetch backend database data function
    const [tableData, setTableData] = useState([]);

    const fetchBackendData = () => {
        fetch(`/tracker`)
        .then(response=>response.json())
        .then(data => {
            setTableData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // When first loading page fetch backend data
    useEffect(() => {
        fetchBackendData();
    }, [])

    const handleDelete = async (row) => {
        // Get the data for the row
        const rowData = row.original;

        fetch(`/delete`, {
            method: 'POST',
            body: JSON.stringify(rowData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Remove the deleted row from tableData state
            setTableData(prevData => prevData.filter(item => item !== rowData));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // React Table Data
    const columns = [
        { Header: 'Material Category', accessor: 'material_category' },
        { Header: 'Product Name', accessor: 'product_name' },
        { Header: 'Material Name', accessor: 'material_name' },
        { Header: 'Manufacturer', accessor: 'manufacturer' },
        { Header: 'EPD Declared Unit', accessor: 'declared_unit' },
        { Header: 'Value 1', accessor: 'value1' },
        { Header: 'Unit 1', accessor: 'unit1' },
        { Header: 'Value 2', accessor: 'value2' },
        { Header: 'Unit 2', accessor: 'unit2' },
        { Header: 'Volume of Material in Project (m3)', accessor: 'mat_volume' },
        { Header: 'A1-A3 (GWP) kg C02 -eq', accessor: 'a1to3' },
        { Header: 'A4 (GWP) kg C02 -eq', accessor: 'a4' },
        { Header: 'A5 (GWP) kg C02 -eq', accessor: 'a5' },
        { Header: 'B1 (GWP) kg C02 -eq', accessor: 'b1' },
        { Header: 'B2 (GWP) kg C02 -eq', accessor: 'b2' },
        { Header: 'B3 (GWP) kg C02 -eq', accessor: 'b3' },
        { Header: 'B4 (GWP) kg C02 -eq', accessor: 'b4' },
        { Header: 'B5 (GWP) kg C02 -eq', accessor: 'b5' },
        { Header: 'B6 (GWP) kg C02 -eq', accessor: 'b6' },
      ];

    return (
        <div className='page-container'>
            <div className='form-container'>
                <form className='form' action='/tracker' method='post' onSubmit={handleSubmit}>
                    <h1 className='tracker-title'>Input EPD Data</h1>
                    <p className='form-p'>
                        All input data will be deleted once the page is refreshed or the web application is closed. 
                        In the event that the data is not deleted, the data will be cleared after one day.
                    </p>
                    <p className="error-message" color='red'>{errorMessage}</p>
                    <div className='input1'>
                        <div className='input-container'>
                            <label>Material Category</label>
                            <select id='material_category' name='material_category'>
                                <option value='Concrete'>Concrete</option>
                                <option value='Wood'>Wood</option>
                                <option value='Brick'>Brick</option>
                                <option value='Glass'>Glass</option>
                                <option value='Steel'>Steel</option>
                                <option value='Aluminum'>Aluminum</option>
                                <option value='Other_Metals'>Other Metals</option>
                                <option value='Stone'>Stone</option>
                                <option value='Ceramics'>Ceramics</option>
                                <option value='Plaster'>Plaster</option>
                                <option value='Fabric'>Fabric</option>
                                <option value='Insulation'>Insulation</option>
                                <option value='Waterproofing'>Waterproofing</option>
                                <option value='Other'>Other</option>
                            </select>
                            <label>Product Name</label>
                            <input id='product_name' name='product_name' type='text' placeholder='Name' required pattern='^(?:\s*\w+\s*){1,50}$' title='Up to 50 words allowed'></input>
                            <label>Material Name</label>
                            <input id='material_name' name='material_name' type='text' placeholder='Name' required pattern='^(?:\s*\w+\s*){1,50}$' title='Up to 50 words allowed'></input>
                            <label>Manufacturer</label>
                            <input id='manufacturer' name='manufacturer' type='text' placeholder='Manufacturer' required pattern='^(?:\s*\w+\s*){1,50}$' title='Up to 50 words allowed'></input>
                        </div>
                    </div>
                    <div className='input2'>
                        <h1 className='tracker-title'>Global Warming Potential &#40;GWP&#41; kg C02 -eq</h1>
                        <h3>EPD Declared Unit</h3>
                        <div className='input-container'>
                            <label>Declared Unit</label>
                            <input id='declared_unit' name='declared_unit' type='text' placeholder='eg. one ton of cold rolled stainless steel' required pattern='^(?:\s*\w+\s*){1,50}$' title='Up to 50 words allowed'></input>
                        </div>
                        <div className='input-grid'>
                            <div className='input-group2'>
                                <label>Value 1</label>
                                <input id='value1' name='value1' type='number' step='0.01' placeholder='Number Value' required></input>
                            </div>
                            <div className='input-group2'>
                                <label>Unit 1</label>
                                <select id='unit1' name='unit1'>
                                    <option value='kg'>kg</option>
                                    <option value='m2'>m2</option>
                                </select>
                            </div>
                            <div className='input-group2'>
                                <label>Value 2</label>
                                <input id='value2' name='value2' type='number' step='0.01' placeholder='Number Value' required></input>
                            </div>
                            <div className='input-group2'>
                                <label>Unit 2</label>
                                <select id='unit2' name='unit2'>
                                    <option value='kg'>kg</option>
                                    <option value='m2'>m2</option>
                                </select>
                            </div>
                        </div>
                        <div className='input-container'>
                            <label>Volume of Material in Project &#40;m3&#41;</label>
                            <input id='mat_volume' name='mat_volume' type='number' step='0.01' placeholder='Volume' required></input>
                        </div>
                    </div>
                        <div className='input-grid'>
                            <div className='input-group'>
                                <label>A1-A3</label>
                                <input id='a1to3' name='a1to3' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>A4</label>
                                <input id='a4' name='a4' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>A5</label>
                                <input id='a5' name='a5' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B1</label>
                                <input id='b1' name='b1' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B2</label>
                                <input id='b2' name='b2' type='number' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B3</label>
                                <input id='b3' name='b3' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B4</label>
                                <input id='b4' name='b4' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B5</label>
                                <input id='b5' name='b5' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                            <div className='input-group'>
                                <label>B6</label>
                                <input id='b6' name='b6' type='number' step='0.01' placeholder='GWP' required></input>
                            </div>
                        </div>
                    <div className='input3'>
                        <button className='button' type='submit'>Add</button>
                    </div>
                </form>
            </div>

            <div className='gradient-transition'>
                <div className='table-section'>
                    <h1 className='tracker-title'>Data Table</h1>
                    <div className='table-container'>
                        <DataTable columns={columns} data={tableData} handleDelete={handleDelete} className='react-table'/>
                    </div>
                </div>
            </div>

            <div className='overallchart-container'>
                <h1 className='tracker-title'>Create Graphs</h1>
                <div className='chartcontainer-one'>
                    <h3>Compare GWP of Different Construction Stages</h3>
                    <div className='barchart-container'>
                        <Barchart />
                    </div>
                    <div className='pichart-container'>
                        <Piechart />
                    </div>
                </div>
                <div className='chartcontainer-two'>
                    <h3>Compare GWP of Different Products</h3>
                    <div className='barcharttwo-container'>
                        <Barcharttwo />
                    </div>
                    <div className='piecharttwo-container'>
                        <Piecharttwo />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Tracker;