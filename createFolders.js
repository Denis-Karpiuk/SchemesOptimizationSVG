const fs = require('fs')

const folderPathes = [
	'./src/Source_SVG',
	'./src/Result_SVG',
	'./src/Result_JSON',
]

folderPathes.forEach(path => {
	fs.mkdir(path, () => {})
})
