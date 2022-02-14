const sharp = require('sharp')
const fs = require('fs')
const names = require('./office_city_names')

const sourseFolderPath = './src/Result_Previews_SVG'

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

pathes.forEach(path => {
	let roomName = path
		.split('/')[3]
		.split('_')[2]
		.split('')
		.filter(el => el >= 0)
		.join('')
		.trim()

	console.log(roomName)

	sharp(path)
		.png()
		.toFile(
			`./src/Result_Previews_PNG/${names.office}_${names.city}_${roomName}.png`
		)
		.then(function (info) {
			console.log(info)
		})
		.catch(function (err) {
			console.log(err)
		})
})
