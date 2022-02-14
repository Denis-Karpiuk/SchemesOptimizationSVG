const fs = require('fs')

const sourseFolderPath = './src/Source_SVG'

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

pathes.forEach(path => {
	fs.unlink(path, () => {})
})
