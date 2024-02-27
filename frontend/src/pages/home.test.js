import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './home.js'

describe(('Home'), () => {
	test('home page renders', () => {
		render(<Home />)

		const heading = screen.getByText(/What benefits do EPDs offer?/i)
		expect(heading).toBeInTheDocument()
	})
})