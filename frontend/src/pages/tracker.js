import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import './tracker.css';
import Barchart from '../components/barchart';
import Piechart from '../components/piechart';
import Barcharttwo from '../components/barchart2';
import Piecharttwo from '../components/piechart2';
import Notification from '../components/Notification';
import { useSessionContext } from '../context';
import TrackerForm from '../components/TrackerForm';
import TrackerTable from '../components/TrackerTable';

const Tracker = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [tableData, setTableData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(false);
    const sessionID = useSessionContext();

    const fetchBackendData = () => {
        fetch(`${backendUrl}/tracker?session_id=${sessionID}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response=>response.json())
        .then(data => {
            setTableData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            setErrorMessage('Error fetching data from backend')
      	    setTimeout(() => {
        	    setErrorMessage(null)
      	    }, 10000)
      	    setMessage(false)
        });
    }

    const handleSubmit = async (formData) => {
        fetch(`${backendUrl}/tracker`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.error) {
                console.error('Error:', data.error);
                setErrorMessage('Error submitting data to backend')
      		    setTimeout(() => {
        		    setErrorMessage(null)
      		    }, 10000)
      		    setMessage(false)
            } else {
                setErrorMessage('Data submitted successfully!')
      		    setTimeout(() => {
        		    setErrorMessage(null)
      		    }, 10000)
      		    setMessage(true);
                // Fetch updated backend data
                fetchBackendData();
            }
        })
        .catch((error) => {
            console.error('Error submitting data to backend:', error);
            setErrorMessage('Error submitting data to backend')
      	    setTimeout(() => {
        	    setErrorMessage(null)
      	    }, 10000)
      	    setMessage(false)
        })
    }

    const handleDelete = async (row) => {
        // Get the data for the row
        const rowData = row.original;

        fetch(`${backendUrl}/delete`, {
            method: 'POST',
            body: JSON.stringify(rowData),
            credentials: 'include',
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
            setErrorMessage('Error deleting data')
      	    setTimeout(() => {
        	    setErrorMessage(null)
      	    }, 10000)
      	    setMessage(false)
        });
    };

    // Function to send request to backend server to clear session data once web app or browser is closed
    const clearSession = async () => {      
        fetch(`${backendUrl}/clearsession?session_id=${sessionID}`, {
            method: 'POST',
            credentials: 'include',
        })
        .then(response => {
            console.log('Session data deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting session data:', error);
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // When first loading page fetch backend data
        fetchBackendData();

        // Add 'beforeunload' event listener
        const handleBeforeUnload = () => {
            clearSession();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean event listener when component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [])

    return (
        <div className='page-container'>
            <Notification error={errorMessage} message={message} />

            <TrackerForm handleSubmit={handleSubmit} />

            <div className='gradient-transition'>
                <TrackerTable handleDelete={handleDelete} tableData={tableData} />
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