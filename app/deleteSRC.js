const { folderPathes } = require('./constants/base-pathes')
const deleteFolder = require('./utils/deleteFolder')

folderPathes.forEach(path => {
	deleteFolder(path)
})
