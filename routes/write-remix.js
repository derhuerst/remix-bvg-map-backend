'use strict'

const writeRemix = require('../lib/write-remix')

const route = (req, res, next) => {
	const id = req.params.id
	// todo: validate id
	// todo: require secret to edit remix
	// todo: validate req.body

	writeRemix(id, req.body)
	.then(() => {
		res.status(200)
		res.json({
			ok: true, msg: 'remix written'
		})
	})
	.catch(next)
}

module.exports = route
