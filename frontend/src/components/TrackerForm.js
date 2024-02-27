import React, { useState } from 'react'
import '../pages/tracker.css'
import { useSessionContext } from '../context'
import Toggle from './Toggle'

const TrackerForm = ({ handleSubmit }) => {
	const [isExpanded, setIsExpanded] = useState(true)

	const sessionID = useSessionContext()

	const addEntry = (event) => {
		event.preventDefault()
		// Get form data
		const formData = new FormData(event.target)
		console.log(formData)
		formData.append('session_id', sessionID)
		console.log(formData)
		handleSubmit(formData)
		// Clear form inputs after successful data submission to backend
		event.target.reset()
	}

	return (
		<div className='form-container'>
			<form data-testid='trackerform' className='form' action='/tracker' method='post' onSubmit={addEntry}>
				<div className='togglecontainer'>
					<h1 className='tracker-title'>Input EPD Data</h1>
					<Toggle
						isToggled={isExpanded}
						onClick={() => setIsExpanded(!isExpanded)}
					/>
				</div>
				{isExpanded && (
					<div>
						<p className='form-p'>
                            All input data will be deleted once the page is refreshed, the user leaves this page, or the web application is closed.
                            In the event that the data is not deleted, the data will be cleared after one day.
						</p>
						<div className='input1'>
							<div className='input-container'>
								<label htmlFor='material_category'>Material Category</label>
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
									<label htmlFor='unit1'>Unit 1</label>
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
									<label htmlFor='unit2'>Unit 2</label>
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
					</div>
				)}
			</form>
		</div>
	)
}

export default TrackerForm