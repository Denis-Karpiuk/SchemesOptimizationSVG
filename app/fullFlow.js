const fs = require('fs')
const { optimize } = require('svgo')
const { previewsSVGOConfig } = require('./svgoConfigures/previewsConfig')
const { schemaConfig } = require('./svgoConfigures/schemaConfig')
const names = require('./office_city_names')

const sourseFolderPath = './src/Source_SVG'
const resultBackendPath = `../server/WSP.WebAPI/Json/Rooms/${names.office}_${names.city}.json`
const resultJsonLocalPath = `./src/Result_JSON/${names.office}_${names.city}.json`
const resultPreviewClientPath = `../client/src/assets/images/roomPreviews/${names.office}_${names.city}`
const roomPreviewsPath = '../client/src/utils/previewsImport/roomPreviews.js'
const previewsImportPath = '../client/src/utils/previewsImport/previews.json'

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

const allRooms = []

let previewsImports = {
	office: `${names.office}`,
	city: `${names.city}`,
	generalImports: [],
	objectImports: [],
}

pathes.forEach(path => {
	let roomName = path
		.split('')
		.filter(el => el >= 0 || el === '-')
		.map(el => (el === '-' ? '_' : el))
		.join('')
		.trim()

	// for create previews improts
	const previewsImportPath = `import ${names.office}_${roomName} from '../../assets/images/roomPreviews/${names.office}_${names.city}/${names.office}_${names.city}_${roomName}.svg'`
	previewsImports.generalImports.push(previewsImportPath)
	previewsImports.objectImports.push(`${names.office}_${roomName}`)

	fs.readFile(path, 'utf8', (error, data) => {
		// create previews
		const previewsResult = optimize(data, previewsSVGOConfig)
		const optimizedSvg = previewsResult.data
		fs.mkdir(resultPreviewClientPath, () => {
			fs.writeFile(
				`${resultPreviewClientPath}/${names.office}_${names.city}_${roomName}.svg`,
				optimizedSvg,
				() => {}
			)
		})

		// create svg json
		const result = optimize(data, schemaConfig)
		const optimizedSvgString = result.data
		allRooms.push({
			officeName: names.office,
			roomName: roomName,
			schema: optimizedSvgString,
		})
		allRooms.sort((a, b) => (Number(a.roomName) > Number(b.roomName) ? 1 : -1))
		// save result in backend folder for parsing
		fs.writeFile(resultBackendPath, JSON.stringify(allRooms), () => {})
		// save result in local result folder
		fs.writeFile(resultJsonLocalPath, JSON.stringify(allRooms), () => {})
	})
})

fs.readFile(previewsImportPath, 'utf8', (error, data) => {
	let jsData = JSON.parse(data)
	let result = []
	if (!!jsData.length) {
		result = jsData.map(el => el)
	}
	result.push(previewsImports)
	fs.writeFileSync(previewsImportPath, JSON.stringify(result), () => {})

	fs.readFile(previewsImportPath, 'utf8', (error, data) => {
		let jsData = JSON.parse(data)

		let allImports = jsData
			.reduce((res, el) => {
				let name = `// ${el.office}_${el.city}`
				res.push(name)
				res.push(el.generalImports)
				return res
			}, [])
			.flat()

		let jsImports = ''
		let allObjImports = '\n'
		let exportObj = 'export const roomPreviews = { \n'

		jsData.forEach(el => {
			let x = ''
			el.objectImports.forEach(elem => (x = x + elem + ','))
			allObjImports =
				allObjImports + '\n' + `const ${el.office}_${el.city}={${x}}` + '\n'
			exportObj = exportObj + `${el.office}_${el.city},` + '\n'
		})

		for (let imp of allImports) {
			jsImports = jsImports + imp + '\n'
		}

		fs.writeFileSync(
			roomPreviewsPath,
			`${jsImports} \n ${allObjImports} \n ${exportObj}}`,
			() => {}
		)
	})
})
