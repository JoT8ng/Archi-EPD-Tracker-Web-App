import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

const Toggle = ({ isToggled, onClick }) => {
	const toggleIcon = isToggled ? (
		<ChevronUpIcon style={{ color: 'black', width: '35px', height: '35px' }} onClick={onClick} />
	) : (
		<ChevronDownIcon style={{ color: 'black', width: '35px', height: '35px' }} onClick={onClick} />
	)

	return (
		<div>{toggleIcon}</div>
	)
}

export default Toggle