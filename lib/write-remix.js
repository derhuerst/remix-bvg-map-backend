'use strict'

const path = require('path')
const fs = require('mz/fs')
const h = require('virtual-dom/virtual-hyperscript/svg')
const {createHash} = require('crypto')

const renderToString = require('./render-to-string')

const sha256 = (str) => {
	const hash = createHash('sha256')
	hash.update(str)
	return hash.digest('hex')
}

const base = path.join(__dirname, '..', 'data')

const assertIsFile = async (filename) => {
	let stats
	try {
		stats = await fs.stat(path.join(base, filename))
	} catch (err) {
		if (err.code === 'ENOENT') err.statusCode = 404
		throw err
	}
	if (!stats.isFile()) throw new Error(filename + ' is not a file')
}

const writeFile = (filename, content) => {
	return fs.writeFile(path.join(base, filename), content)
}

const writeRemix = async (id, secret, remix) => {
	await assertIsFile(id + '.json')
	if (id !== sha256(secret).slice(0, 10)) {
		const err = new Error('invalid secret')
		err.statusCode = 401
		throw err
	}

	let json = '', svg = ''
	try {
		json = JSON.stringify(remix)
		svg = renderToString(h, remix)
	} catch (err) {
		err.statusCode = 400
		throw err
	}

	await writeFile(id + '.json', json)
	await writeFile(id + '.svg', svg)
}

module.exports = writeRemix
