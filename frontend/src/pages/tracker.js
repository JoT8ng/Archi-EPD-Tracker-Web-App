import React, { useEffect, useState } from 'react'
import './tracker.css'
import Barchart from '../components/barchart'
import Piechart from '../components/piechart'
import Barcharttwo from '../components/barchart2'
import Piecharttwo from '../components/piechart2'
import Notification from '../components/Notification'
import { useSessionContext } from '../context'
import TrackerForm from '../components/TrackerForm'
import TrackerTable from '../components/TrackerTable'
import Toggle from '../components/Toggle'
import trackerService from '../services/TrackerServices'

const Tracker = () => {
	const [tableData, setTableData] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [message, setMessage] = useState(false)
	const [isExpandedOne, setIsExpandedOne] = useState(false)
	const [isExpandedTwo, setIsExpandedTwo] = useState(false)
	const sessionID = useSessionContext()

	const fetchBackendData = async () => {
		try {
			const data = await trackerService.getAll(sessionID)
			setTableData(data)
		} catch (error) {
			console.error('Error fetching data:', error)
			setErrorMessage('Error fetching data from backend')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
	}

	const handleSubmit = async (formData) => {
		if (sessionID === null) {
			setErrorMessage('Connecting to backend server... Please wait a few minutes and try again later')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
			return
		}

		try {
			const data = await trackerService.add(formData)
			console.log(data)

			setErrorMessage('Data submitted successfully!')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(true)

			// Fetch updated backend data
			fetchBackendData()
		} catch (error) {
			console.error('Error submitting data to backend:', error)
			setErrorMessage('Error submitting data to backend')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
	}

	const handleDelete = async (row) => {
		// Get the data for the row
		const rowData = row.original

		try {
			const data = await trackerService.deleteRow(rowData)
			console.log(data)
			// Remove the deleted row from tableData state
			setTableData(prevData => prevData.filter(item => item !== rowData))
		} catch (error) {
			console.error('Error:', error)
			setErrorMessage('Error deleting data')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
	}

	// Function to send request to backend server to clear session data once web app or browser is closed
	const clearSession = async (sessionID) => {
		try {
			await trackerService.clear(sessionID)
		} catch (error) {
			console.error('Error deleting session data:', error)
		}
	}

	useEffect(() => {
		// When first loading page fetch backend data
		fetchBackendData()

		const handleUnload = () => {
			clearSession(sessionID)
		}
		const handleBeforeUnload = (event) => {
			event.preventDefault()
			event.returnValue = 'Are you sure you want to leave? Any changes will be lost.'

			setTimeout(() => {
				clearSession(sessionID)
			}, 0)
		}
		window.addEventListener('unload', handleUnload)
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			window.removeEventListener('unload', handleUnload)
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [sessionID])

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
					<div className='togglecontainer'>
						<h3>Compare GWP of Different Construction Stages</h3>
						<Toggle
							id='toggle1'
							isToggled={isExpandedOne}
							onClick={() => setIsExpandedOne(!isExpandedOne)}
						/>
					</div>
					{isExpandedOne && (
						<div>
							<div className='barchart-container'>
								<Barchart />
							</div>
							<div className='pichart-container'>
								<Piechart />
							</div>
						</div>
					)}
				</div>
				<div className='chartcontainer-two'>
					<div className='togglecontainer'>
						<h3>Compare GWP of Different Products</h3>
						<Toggle
							id='toggle2'
							isToggled={isExpandedTwo}
							onClick={() => setIsExpandedTwo(!isExpandedTwo)}
						/>
					</div>
					{isExpandedTwo && (
						<div>
							<div className='barcharttwo-container'>
								<Barcharttwo />
							</div>
							<div className='piecharttwo-container'>
								<Piecharttwo />
							</div>
						</div>
					)}
				</div>
			</div>

		</div>
	)
}

export default Tracker