'use strict'

const express = require('express')
const createCors = require('corser').create
const compression = require('compression')
const hsts = require('hsts')
const serveStatic = require('serve-static')
const path = require('path')

const api = express()

api.use(createCors(['User-Agent']))
api.use(compression())
api.use(hsts({
	maxAge: 10 * 24 * 60 * 60
}))

// todo

// serve data dir
api.use(serveStatic(path.join(__dirname, 'data'), {
	fallthrough: false,
	index: false,
	maxAge: 60 * 60 * 1000
}))

module.exports = api
