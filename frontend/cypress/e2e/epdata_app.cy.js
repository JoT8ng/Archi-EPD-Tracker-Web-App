describe('Blog app', function() {
	beforeEach(function() {
		cy.visit('')
	})

	it('home page can be opened', function() {
		cy.visit('')
		cy.contains('EPData.')
	})

	it('contact page can be visited', function() {
		cy.contains('Contact').click()
		cy.contains('Contact')
	})

	it('Tracker page functions properly', function() {
		cy.contains('Tracker').click()
		cy.contains('Input EPD Data')

		cy.get('#material_category').type('Concrete')
		cy.get('#product_name').type('Wicline Evo')
		cy.get('#material_name').type('Aluminum frame')
		cy.get('#manufacturer').type('Wicona')
		cy.get('#declared_unit').type('Onem2 of aluminum frame module')
		cy.get('#value1').type('1')
		cy.get('#unit1').type('m2')
		cy.get('#value2').type('2')
		cy.get('#unit2').type('kg')
		cy.get('#mat_volume').type('1000')
		cy.get('#a1to3').type('10')
		cy.get('#a4').type('20')
		cy.get('#a5').type('30')
		cy.get('#b1').type('50')
		cy.get('#b2').type('60')
		cy.get('#b3').type('70')
		cy.get('#b4').type('80')
		cy.get('#b5').type('90')
		cy.get('#b6').type('100')

		cy.get('#add-button').click()

		cy.wait(5000)
		cy.contains('Wicona')

		cy.get('[id="toggle"]').click({ multiple: true })
		cy.get('#barchart-refresh').click()
		cy.get('#barchart-select').select('Wicline Evo')

		cy.get('#delete-button').click()
		cy.contains('Wicona').should('not.exist')
	})
})