'use strict'

const api = require('./api')

const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || ''

api.listen(port, (err) => {
	if (err) {
		console.error(err)
		process.exitCode = 1
	} else {
		console.info(`Listening on ${hostname}:${port}.`)
	}
})
