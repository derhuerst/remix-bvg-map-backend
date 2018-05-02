'use strict'

const writeRemix = require('../lib/write-remix')

const validId = /[0-9a-f]{10}/i
const validSecret = /[0-9a-f]{10,}/i

const route = (req, res, next) => {
	const id = req.params.id
	if (!validId.test(id)) {
		res.status(400)
		res.json({
			ok: false, msg: 'invalid id'
		})
	}
	const secret = req.get('X-Secret')
	if (!validSecret.test(secret)) {
		res.status(400)
		res.json({
			ok: false, msg: 'invalid secret'
		})
	}

	// todo: validate req.body

	writeRemix(id, secret, req.body)
	.then(() => {
		res.status(200)
		res.json({
			ok: true, msg: 'remix written'
		})
	})
	.catch(next)
}

module.exports = route
