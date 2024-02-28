const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		setupNodeEvents() {
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:3000',
		env: {

			BACKEND: 'http://127.0.0.1:5000'
		}
	},
})
