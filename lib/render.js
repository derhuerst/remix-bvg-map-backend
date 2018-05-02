'use strict'

const bounds = require('svg-path-bounds')
const generate = require('bvg-topological-map/render')

// todo: move into a lib used by both
const createRenderRemix = require('remix-bvg-map-frontend/lib/render-remix')

const render = (h, remix) => {
	const renderRemix = createRenderRemix(remix, 'remix')

	const renderStyles = (h, opt, data) => {
		return generate.defaults.renderStyles(h, opt, data) + `
.remix {
	font-family: sans-serif;
	font-size: 8px;
}`
	}

	const middleLayer = (h, opt, data) => [
		renderRemix(h, opt, data)
	]

	return generate(h, {renderStyles, middleLayer})
}

module.exports = render
