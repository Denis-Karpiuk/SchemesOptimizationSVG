const fs = require('fs')
const { optimize } = require('svgo')
const { previewsSVGOConfig } = require('./svgoConfigures/previewsConfig')
const { schemaConfig } = require('./svgoConfigures/schemaConfig')
const names = require('./office_city_names')

const sourseFolderPath = './src/Source_SVG'
const resultPreviewLocalPath = `./src/Result_Previews_SVG/${names.office}_${names.city}_`
const resultJsonLocalPath = `./src/Result_JSON/${names.office}_${names.city}.json`

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

const allRooms = []

pathes.forEach(path => {
	let roomName = path
		.split('')
		.filter(el => el >= 0 || el === '-')
		.map(el => (el === '-' ? '_' : el))
		.join('')
		.trim()

	fs.readFile(path, 'utf8', (error, data) => {
		// create previews
		const previewsResult = optimize(data, previewsSVGOConfig)
		const optimizedSvg = previewsResult.data

		fs.writeFile(
			`${resultPreviewLocalPath}${roomName}.svg`,
			optimizedSvg,
			() => {}
		)

		// create svg json
		const result = optimize(data, schemaConfig)
		const optimizedSvgString = result.data
		allRooms.push({
			officeName: names.office,
			roomName: roomName,
			schema: optimizedSvgString,
		})
		allRooms.sort((a, b) => (Number(a.roomName) > Number(b.roomName) ? 1 : -1))

		// save result in local result folder
		fs.writeFile(resultJsonLocalPath, JSON.stringify(allRooms), () => {})
	})
})
