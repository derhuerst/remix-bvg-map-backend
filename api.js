'use strict'

const express = require('express')
const corser = require('corser')
const compression = require('compression')
const hsts = require('hsts')
const createJsonParser = require('body-parser').json
const serveStatic = require('serve-static')
const path = require('path')

const createRemix = require('./routes/create-remix')
const writeRemix = require('./routes/write-remix')

const api = express()

api.use(corser.create({
	methods: corser.simpleMethods.concat('PATCH'),
	requestHeaders: corser.simpleRequestHeaders.concat('X-Secret')
}))
api.use(compression())
api.use(hsts({
	maxAge: 10 * 24 * 60 * 60
}))

const jsonParser = createJsonParser()
api.post('/', createRemix)
api.patch('/:id', jsonParser, writeRemix)

// serve data dir
api.use(serveStatic(path.join(__dirname, 'data'), {
	index: false,
	maxAge: 60 * 60 * 1000
}))

api.use((err, req, res, next) => {
	const msg = err && err.message || (err + '')
	if (process.env.NODE_DEBUG === 'remix-bvg-map-backend') console.error(err)
	else console.error(msg)
	if (!res.headersSent) {
		res.status(err && err.statusCode || 500)
		res.json({ok: false, msg})
	}
	next()
})

module.exports = api
