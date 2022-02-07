const fs = require('fs')

const officeName = 'K3'
const cityName = 'Gomel'

const sourseFolderPath = './src/Result_SVG'
const resultFolderPath = `./src/Result_JSON/${officeName}_${cityName}.json`

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
			officeName: officeName,
			roomName: roomName,
			schema: data,
		})

		allRooms.sort((a, b) => (a.roomName > b.roomName ? 1 : -1))

		fs.writeFile(resultFolderPath, JSON.stringify(allRooms), () => {})
	})
})
