const fs = require('fs')

const folderPathes = [
	'./src/Source_SVG',
	'./src/Result_SVG',
	'./src/Result_JSON',
	'./src/Result_Previews_SVG',
	'./src/Result_Previews_PNG',
]

folderPathes.forEach(path => {
	fs.mkdir(path, () => {})
})

module.exports.folderPathes = folderPathes
