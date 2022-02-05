const fs = require('fs')

const sourseFolderPath = './src/ResultFolderSVG'
const resultFolderPath = './src/Result_JSON/Rooms.json'

const officeName = 'K3'

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
	console.log(roomName)
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
