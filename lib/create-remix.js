'use strict'

const path = require('path')
const fs = require('mz/fs')
const {createHash, randomBytes} = require('crypto')

const sha256 = (str) => {
	const hash = createHash('sha256')
	hash.update(str)
	return hash.digest('hex')
}

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
	const secret = randomBytes(10).toString('hex')
	const id = sha256(secret).slice(0, 10)
	await assertDoesNotExist(id + '.json')

	const json = JSON.stringify({
		stations: {}
	})
	await fs.writeFile(path.join(base, id + '.json'), json)

	return {id, secret}
}

module.exports = createRemix
