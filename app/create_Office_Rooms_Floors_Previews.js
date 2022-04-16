const fs = require('fs')
const { optimize } = require('svgo')
const { roomSchemaConfig } = require('./svgoConfigures/roomSchemaConfig')
const { floorSchemaConfig } = require('./svgoConfigures/floorSchemaConfig')
const { previewsRoomConfig } = require('./svgoConfigures/previewsRoomConfig')
const {
	DESIGNER_FOLDER_PATH,
	APP_SOURSE_FOLDER_PATH,
	SERVER_BASE_PATH,
	APP_RESULT_FOLDER,
} = require('./constants/base-pathes')
const { createPathes } = require('./utils/createPathes')
const { folderCreator } = require('./createFolders')

const isOnlyLocal =
	process.argv[2] === 'local' ||
	(process.argv[3] === 'local' && process.argv[2] === 'desk')

const isGlobalFolder = process.argv[2] === 'desk'

const SOURSE_FLODER_PATH = isGlobalFolder
	? DESIGNER_FOLDER_PATH
	: APP_SOURSE_FOLDER_PATH

let officesPathes = createPathes(SOURSE_FLODER_PATH)

officesPathes.forEach(officePath => {
	const [officeName, cityName] = officePath.split('/').pop().split('_')

	const LOCAL_RESULT_BASE_PATH = `${APP_RESULT_FOLDER}/${officeName}_${cityName}`
	const LOCAL_ROOMS_PATH = `${LOCAL_RESULT_BASE_PATH}/Rooms`
	const LOCAL_ROOM_PREVIEWS_PATH = `${LOCAL_RESULT_BASE_PATH}/RoomPreviews`
	const LOCAL_FLOORS_PATH = `${LOCAL_RESULT_BASE_PATH}/Floors`

	const SERVER_ROOMS_PATH = `${SERVER_BASE_PATH}/Json/Rooms/${officeName}_${cityName}.json`
	const SERVER_FLOORS_PATH = `${SERVER_BASE_PATH}/Json/Floors/${officeName}_${cityName}.json`
	const SERVER_ROOM_PREVIEWS_PATH = `${SERVER_BASE_PATH}/Images/RoomPreviews/${officeName}_${cityName}`

	if (isOnlyLocal) {
		folderCreator()
		fs.mkdir(LOCAL_RESULT_BASE_PATH, error => {
			if (error) {
				console.log(`Error create ${officeName} ${cityName} folder local`)
			}
		})
	}

	// Room schema and preview creator
	const roomsFolderPath = `${officePath}/Rooms`

	if (fs.existsSync(roomsFolderPath)) {
		const roomsFilesPathes = fs
			.readdirSync(roomsFolderPath, () => {})
			.map(path => roomsFolderPath + '/' + path)

		const allRooms = []

		roomsFilesPathes.forEach(path => {
			const roomName = path.split('/').pop().replace('.svg', '')
			const roomNamePreviews = roomName.replace('-', '_')
			fs.readFile(path, 'utf8', (error, data) => {
				// optimization room preview
				const previewsResult = optimize(data, previewsRoomConfig)
				if (previewsResult.hasOwnProperty('error')) {
					console.log('Error ' + roomName + previewsResult.error)
					return
				}
				const optimizedPreviewSvg = previewsResult.data

				// optimization room schema
				const roomSchemaresult = optimize(data, roomSchemaConfig)
				if (roomSchemaresult.hasOwnProperty('error')) {
					console.log('Error ' + roomName + roomSchemaresult.error)
					return
				}
				const optimizedRoomSchema = roomSchemaresult.data

				allRooms.push({
					officeName: officeName,
					roomName: roomName,
					schema: optimizedRoomSchema,
				})

				if (!isOnlyLocal) {
					// save room prview on server
					if (!fs.existsSync(SERVER_ROOM_PREVIEWS_PATH)) {
						fs.mkdirSync(SERVER_ROOM_PREVIEWS_PATH, error => {
							if (error) {
								console.log(
									`Error create folder for previews ${officeName}_${cityName} on server`
								)
							}
						})
					}
					fs.writeFileSync(
						`${SERVER_ROOM_PREVIEWS_PATH}/${officeName}_${cityName}_${roomNamePreviews}.svg`,
						optimizedPreviewSvg,
						error => {
							if (error) {
								console.log(
									`Error save prview room ${roomNamePreviews} on server`
								)
							}
						}
					)
					console.log(`Create preview ${roomNamePreviews} on server`)

					// save room schemas json on server
					fs.writeFileSync(
						SERVER_ROOMS_PATH,
						JSON.stringify(allRooms),
						error => {
							if (error) {
								console.log(
									`Error save room schemas json  ${officeName}_${cityName} on server`
								)
							}
						}
					)
					console.log(`Created room ${roomName} on server`)
				}

				if (isOnlyLocal) {
					// save room prview in local result folder
					if (!fs.existsSync(LOCAL_ROOM_PREVIEWS_PATH)) {
						fs.mkdirSync(LOCAL_ROOM_PREVIEWS_PATH, error => {
							if (error) {
								console.log(
									`Error create ${officeName}_${cityName} folder on local`
								)
							}
						})
						console.log(`Create preview ${roomNamePreviews} on local`)
					}

					fs.writeFileSync(
						`${LOCAL_ROOM_PREVIEWS_PATH}/${officeName}_${cityName}_${roomNamePreviews}.svg`,
						optimizedPreviewSvg,
						error => {
							if (error) {
								console.log(
									`Error save prview room ${roomNamePreviews} on local`
								)
							}
							console.log(`Create preview ${roomNamePreviews} on local`)
						}
					)

					// save room schemas in local result folder
					if (!fs.existsSync(LOCAL_ROOMS_PATH)) {
						fs.mkdirSync(LOCAL_ROOMS_PATH, error => {
							if (error) {
								console.log(
									`Error create ${officeName}_${cityName} folder on local`
								)
							}
						})
					}
					fs.writeFileSync(
						`${LOCAL_ROOMS_PATH}/${officeName}_${cityName}.json`,
						JSON.stringify(allRooms),
						error => {
							if (error) {
								console.log(
									`Error save room schemas json  ${officeName}_${cityName} on local`
								)
							}
						}
					)
					console.log(`Created room ${roomName} on local`)
				}
			})
		})
	}

	// Floor schema creator
	const floorsFolderPath = `${officePath}/Floors`

	if (!fs.existsSync(floorsFolderPath)) {
		return
	}

	const floorsFilesPathes = fs
		.readdirSync(floorsFolderPath, () => {})
		.map(path => floorsFolderPath + '/' + path)

	const allFloors = []

	floorsFilesPathes.forEach(path => {
		let floorName = path.split('/').pop().replace('.svg', '')
		fs.readFile(path, 'utf8', (error, data) => {
			// optimization floor schema
			const floorSchemaresult = optimize(data, floorSchemaConfig)
			const optimizedFloorSchema = floorSchemaresult.data

			allFloors.push({
				officeName: officeName,
				floorName: floorName,
				floorSchema: optimizedFloorSchema,
			})

			if (!isOnlyLocal) {
				// save floor schemas json on server
				fs.writeFileSync(
					SERVER_FLOORS_PATH,
					JSON.stringify(allFloors),
					error => {
						if (error) {
							console.log(
								`Error save floor schemas on server ${officeName} floor${floorName}`
							)
						}
					}
				)
				console.log('Created floor ' + floorName + 'on server')
			}

			if (isOnlyLocal) {
				// save floor schemas in local result folder
				if (!fs.existsSync(LOCAL_FLOORS_PATH)) {
					fs.mkdirSync(LOCAL_FLOORS_PATH, error => {
						if (error) {
							console.log(
								`Error create ${officeName}_${cityName} folder for floor on local`
							)
						}
					})
				}

				fs.writeFileSync(
					`${LOCAL_FLOORS_PATH}/${officeName}_${cityName}.json`,
					JSON.stringify(allFloors),
					error => {
						if (error) {
							console.log(
								`Error save floor schemas json  ${officeName}_${cityName} on local`
							)
						}
					}
				)
				console.log('Created floor ' + floorName + 'on local')
			}
		})
	})
})
