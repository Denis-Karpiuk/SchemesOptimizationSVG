const fs = require('fs')

function createPathes(basePath) {
	const pathes = fs
		.readdirSync(basePath, () => {})
		.map(path => basePath + '/' + path)
	return pathes
}

exports.createPathes = createPathes
