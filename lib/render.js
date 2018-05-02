'use strict'

const bounds = require('svg-path-bounds')
const generate = require('bvg-topological-map/render')

const render = (h, remix) => {
	const middleLayer = (h, opt, data) => {
		const res = []

		for (let id of Object.keys(remix.stations)) {
			const station = data.stations[id]
			if (!station) continue // ignore invalid IDs

			const caption = remix.stations[id]
			const [left, top, right, bottom] = bounds(station.shape)
			const x = left + (right - left) / 2
			const y = top + (bottom - top) / 2

			res.push(h('text', {
				x: x.toFixed(3),
				y: y.toFixed(3)
			}, caption))
		}

		return [
			h('g', {}, res)
		]
	}

	return generate(h, {middleLayer})
}

module.exports = render
