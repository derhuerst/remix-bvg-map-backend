'use strict'

const toString = require('virtual-dom-stringify')

const render = require('./render')

const renderToString = (h, remix) => {
	return toString(render(h, remix))
}

module.exports = renderToString
