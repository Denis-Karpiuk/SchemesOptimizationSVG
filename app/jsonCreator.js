const fs = require('fs')
const names = require('./office_city_names')

const sourseFolderPath = './src/Result_SVG'
// backendPath
const resultBackendPath = `../server/WSP.WebAPI/Json/Rooms/${names.office}_${names.city}.json`
// localPath
const resultLocalPath = `./src/Result_JSON/${names.office}_${names.city}.json`

let pathes = fs
	.readdirSync(sourseFolderPath, () => {})
	.map(path => sourseFolderPath + '/' + path)

const allRooms = []
pathes.forEach(path => {
	let roomName = path
		.split('')
		.filter(el => el >= 0)
		.join('')
		.trim()

	fs.readFile(path, 'utf8', (error, data) => {
		allRooms.push({
			officeName: names.office,
			roomName: roomName,
			schema: data,
		})

		allRooms.sort((a, b) => (a.roomName > b.roomName ? 1 : -1))

		// save result in backend folder for parsing
		fs.writeFile(resultBackendPath, JSON.stringify(allRooms), () => {})

		// save result in local result folder
		fs.writeFile(resultLocalPath, JSON.stringify(allRooms), () => {})
	})
})
