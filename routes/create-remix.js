'use strict'

const createRemix = require('../lib/create-remix')

const route = (req, res, next) => {
	createRemix()
	.then(({id, secret}) => {
		res.status(201)
		res.set('Location', `/${id}/edit`)
		res.json({
			ok: true, msg: 'remix created',
			id, secret
		})
	})
	.catch(next)
}

module.exports = route
