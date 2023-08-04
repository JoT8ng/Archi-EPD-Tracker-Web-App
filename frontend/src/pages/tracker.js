import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import fetch from 'node-fetch';
import './tracker.css';
import Barchart from '../components/barchart';
import Piechart from '../components/piechart';
import Barcharttwo from '../components/barchart2';
import Piecharttwo from '../components/piechart2';


// Create React Table
const DataTable = ({ columns, data }) => {
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

    // Fetch backend database data
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('/tracker')
        .then(response=>response.json())
        .then(data => {
            setTableData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [])

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
            <h1>Input EPD Data</h1>
            <hr />
            <form action='/tracker' method='post' onSubmit={handleSubmit}>
                <div className='input1'>
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
                <div className='input2'>
                    <h3>Product Name</h3>
                    <input id='product_name' name='product_name' type='text' placeholder='Name' required></input>
                    <h3>Material Name</h3>
                    <input id='material_name' name='material_name' type='text' placeholder='Name' required></input>
                </div>
                <div className='input3'>
                    <h3>Manufacturer</h3>
                    <input id='manufacturer' name='manufacturer' type='text' placeholder='Manufacturer' required></input>
                </div>
                <div className='input4'>
                    <h1>Global Warming Potential &#40;GWP&#41; kg C02 -eq</h1>
                </div>
                <div className='input5'>
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
                <div className='input6'>
                    <h3>Volume of Material in Project &#40;m3&#41;</h3>
                    <input id='mat_volume' name='mat_volume' type='number' placeholder='Volume' required></input>
                </div>
                <div className='input7'>
                    <h3>A1-A3</h3>
                    <input id='a1to3' name='a1to3' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input8'>
                    <h3>A4</h3>
                    <input id='a4' name='a4' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input9'>
                    <h3>A5</h3>
                    <input id='a5' name='a5' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input10'>
                    <h3>B1</h3>
                    <input id='b1' name='b1' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input11'>
                    <h3>B2</h3>
                    <input id='b2' name='b2' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input12'>
                    <h3>B3</h3>
                    <input id='b3' name='b3' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input13'>
                    <h3>B4</h3>
                    <input id='b4' name='b4' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input14'>
                    <h3>B5</h3>
                    <input id='b5' name='b5' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input15'>
                    <h3>B6</h3>
                    <input id='b6' name='b6' type='number' placeholder='GWP' required></input>
                </div>
                <div className='input16'>
                    <button className='button' type='submit'>Add</button>
                </div>
            </form>

            <hr />

            <h1>Data Table</h1>
            <div className='table-container'>
                <DataTable columns={columns} data={tableData} className="react-table"/>
            </div>

            <hr />

            <h1>Create Graphs</h1>
            <div className='overallchart-container'>
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