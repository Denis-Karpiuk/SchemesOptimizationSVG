const {
	SERVER_PREVIEWS_PATH,
	SERVER_ROOMS_PATH,
	SERVER_FLOORS_PATH,
} = require('./constants/base-pathes')
const { createPathes } = require('./utils/createPathes')
const { deleteFiles } = require('./utils/deleteFiles')
const deleteFolder = require('./utils/deleteFolder')

// delete previews from server
const perviewsPathes = createPathes(SERVER_PREVIEWS_PATH)
perviewsPathes.forEach(path => {
	deleteFolder(path)
})

// delete rooms from server
const roomsPathes = createPathes(SERVER_ROOMS_PATH)
!!roomsPathes.length && deleteFiles(roomsPathes)

// delete floors from server
const floorsPathes = createPathes(SERVER_FLOORS_PATH)
!!floorsPathes.length && deleteFiles(floorsPathes)
