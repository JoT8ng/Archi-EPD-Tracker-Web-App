import { useTable } from 'react-table'
import '../pages/tracker.css'

// Create React Table
export const DataTable = ({ columns, data, handleDelete }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data })

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
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							<td>
								<button onClick={() => handleDelete(row)}>Delete</button>
							</td>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

const TrackerTable = ({ handleDelete, tableData }) => {
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
	]

	return (
		<div className='table-section'>
			<h1 className='tracker-title'>Data Table</h1>
			<div className='table-container'>
				<DataTable columns={columns} data={tableData} handleDelete={handleDelete} className='react-table' />
			</div>
		</div>
	)

}

export default TrackerTable