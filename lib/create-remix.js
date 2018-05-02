'use strict'

const path = require('path')
const fs = require('mz/fs')
const {randomBytes} = require('crypto')

const base = path.join(__dirname, '..', 'data')

const assertDoesNotExist = async (filename) => {
	try {
		await fs.stat(path.join(base, filename))
	} catch (err) {
		if (err.code === 'ENOENT') return null
		throw err
	}
	throw new Error(filename + ' already exists')
}

const createRemix = async () => {
	const id = randomBytes(10).toString('hex')
	await assertDoesNotExist(id + '.json')

	const json = JSON.stringify({
		stations: {}
	})
	await fs.writeFile(path.join(base, id + '.json'), json)

	return id
}

module.exports = createRemix
