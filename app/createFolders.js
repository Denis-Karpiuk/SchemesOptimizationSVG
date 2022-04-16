const fs = require('fs')
const { folderPathes, APP_SRC_FOLDER } = require('./constants/base-pathes')

if (!fs.existsSync(APP_SRC_FOLDER)) {
	folderPathes.forEach(path => {
		fs.mkdirSync(path, () => {})
	})
}


function folderCreator (){
	if (!fs.existsSync(APP_SRC_FOLDER)) {
		folderPathes.forEach(path => {
			fs.mkdirSync(path, () => {})
		})
	}
}

exports.folderCreator = folderCreator