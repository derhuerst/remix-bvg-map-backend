'use strict'

const express = require('express')
const compression = require('compression')
const hsts = require('hsts')
const serveStatic = require('serve-static')

const api = express()

api.use(compression())
api.use(hsts({
	maxAge: 10 * 24 * 60 * 60
}))

// todo

module.exports = api
