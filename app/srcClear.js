const fs = require('fs')

const { folderPathes } = require('./foldersCreator')

function deleteFolder(path) {
	let files = []
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path)
		files.forEach(function (file, index) {
			let curPath = path + '/' + file
			if (fs.statSync(curPath).isDirectory()) {
				deleteFolder(curPath)
			} else {
				fs.unlinkSync(curPath)
			}
		})
		fs.rmdirSync(path)
	}
}

folderPathes.forEach(path => {
	deleteFolder(path)
})
