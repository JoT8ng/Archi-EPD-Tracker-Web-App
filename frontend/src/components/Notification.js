const Notification = ({ error, message }) => {
	let errorStyle = {
		color: 'green',
		fontSize: 20,
		background: 'lightgreen',
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	if (!message) {
		errorStyle = {
			color: 'red',
			fontSize: 20,
			background: 'lightred',
			borderStyle: 'solid',
			borderRadius: 5,
			padding: 10,
			marginBottom: 10,
		}
	}

	return (
		<div>
			{error && error !== null && <p style={errorStyle}>{error}</p>}
		</div>
	)
}

export default Notification